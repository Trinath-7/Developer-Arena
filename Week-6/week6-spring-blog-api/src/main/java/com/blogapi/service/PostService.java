// Package naming layout matching project packages
package com.blogapi.service;

// Import request/response DTOs, entity model mappings, exceptions and repositories
import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.entity.Category;
import com.blogapi.model.entity.Post;
import com.blogapi.repository.CategoryRepository;
import com.blogapi.repository.PostRepository;
import com.blogapi.model.mapper.PostMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// Marks class as a Spring Service Bean holding post logic operations
@Service
// Automatically generates a constructor injecting final dependencies
@RequiredArgsConstructor
// Starts standard JDBC transactions around public methods
@Transactional
public class PostService {
    
    // Auto-injected Repository dependency for Post CRUD database actions
    private final PostRepository postRepository;
    // Auto-injected Repository dependency for Category verification queries
    private final CategoryRepository categoryRepository;
    // Auto-injected mapping utility to switch between DTO and Model objects
    private final PostMapper postMapper;
    
    // Retrieves a paginated chunk of posts matching query constraints
    public Page<PostResponse> getAllPosts(Pageable pageable) {
        // Query paginated page list of database entities and map page members to response records
        return postRepository.findAll(pageable)
                .map(postMapper::toResponse);
    }
    
    // Finds details for a specific post by database primary key ID
    public PostResponse getPostById(Long id) {
        // Retrieve database entity, else raise custom resource exceptions for controller handlers
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        // Return mapped representation
        return postMapper.toResponse(post);
    }
    
    // Inserts a new post and registers it under a valid category context
    public PostResponse createPost(PostRequest postRequest) {
        // Verify target category exists inside database
        Category category = categoryRepository.findById(postRequest.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException(
                        "Category not found with id: " + postRequest.getCategoryId()));
        
        // Map DTO data fields and relation properties to persistent domain entity
        Post post = postMapper.toEntity(postRequest, category);
        // Save database entity record
        Post savedPost = postRepository.save(post);
        // Map entity response fields to DTO schema
        return postMapper.toResponse(savedPost);
    }
    
    // Modifies attributes of a saved blog post by its database key
    public PostResponse updatePost(Long id, PostRequest postRequest) {
        // Load target post entity
        Post post = postRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + id));
        
        // If updating the category relationship, verify the new Category exists first
        if (!post.getCategory().getId().equals(postRequest.getCategoryId())) {
            Category category = categoryRepository.findById(postRequest.getCategoryId())
                    .orElseThrow(() -> new ResourceNotFoundException(
                            "Category not found with id: " + postRequest.getCategoryId()));
            post.setCategory(category);
        }
        
        // Update direct properties
        post.setTitle(postRequest.getTitle());
        post.setContent(postRequest.getContent());
        post.setAuthor(postRequest.getAuthor());
        
        // Save database model updates and map returned entity back to DTO
        Post updatedPost = postRepository.save(post);
        return postMapper.toResponse(updatedPost);
    }
    
    // Removes post resource from the database
    public void deletePost(Long id) {
        // Verify model exists before executing removal
        if (!postRepository.existsById(id)) {
            throw new ResourceNotFoundException("Post not found with id: " + id);
        }
        // Delete post by its key
        postRepository.deleteById(id);
    }
    
    // Obtains a list of posts published under a given category ID
    public List<PostResponse> getPostsByCategory(Long categoryId) {
        // Verify category exists
        if (!categoryRepository.existsById(categoryId)) {
            throw new ResourceNotFoundException("Category not found with id: " + categoryId);
        }
        
        // Return collection of category-matched posts mapped to DTO payloads
        return postRepository.findByCategoryId(categoryId)
                .stream()
                .map(postMapper::toResponse)
                .collect(Collectors.toList());
    }
}
