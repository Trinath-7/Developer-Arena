// Package mapping matching Spring configurations
package com.blogapi.service;

// Import DTOs, entities, exceptions, repositories and mappers
import com.blogapi.model.dto.CommentRequest;
import com.blogapi.model.dto.CommentResponse;
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.entity.Comment;
import com.blogapi.model.entity.Post;
import com.blogapi.repository.CommentRepository;
import com.blogapi.repository.PostRepository;
import com.blogapi.model.mapper.CommentMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// Marks class as a Service component containing business rules for comments
@Service
// Automatically generates constructors for injecting final fields
@RequiredArgsConstructor
// Configures JPA transaction boundary wrapper
@Transactional
public class CommentService {
    // Injected comments persistence repository
    private final CommentRepository commentRepository;
    // Injected posts repository (used for verification checks)
    private final PostRepository postRepository;
    // Injected object conversion mapper
    private final CommentMapper commentMapper;

    // Queries comments associated with a post ID, mapping results to DTO list
    public List<CommentResponse> getCommentsByPostId(Long postId) {
        // Validate post presence in database first
        if (!postRepository.existsById(postId)) {
            throw new ResourceNotFoundException("Post not found with id: " + postId);
        }
        // Retrieve and convert database collection
        return commentRepository.findByPostId(postId).stream()
                .map(commentMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Creates a new comment under a specific post
    public CommentResponse createComment(CommentRequest request) {
        // Find parent post entity, else throw exception
        Post post = postRepository.findById(request.getPostId())
                .orElseThrow(() -> new ResourceNotFoundException("Post not found with id: " + request.getPostId()));
        
        // Map request fields and post reference into comment entity object
        Comment comment = commentMapper.toEntity(request, post);
        // Persist comment entity inside database and map returned state back to DTO
        return commentMapper.toResponse(commentRepository.save(comment));
    }

    // Removes a comment from the database
    public void deleteComment(Long id) {
        // Validate resource presence
        if (!commentRepository.existsById(id)) {
            throw new ResourceNotFoundException("Comment not found with id: " + id);
        }
        // Execute removal
        commentRepository.deleteById(id);
    }
}
