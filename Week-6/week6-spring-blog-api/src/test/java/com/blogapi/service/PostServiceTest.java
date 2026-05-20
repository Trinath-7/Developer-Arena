// Package mapping configuration
package com.blogapi.service;

// Import DTO schemas, entity models, exceptions, repositories, mappers and mock frameworks
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;
import com.blogapi.model.entity.Category;
import com.blogapi.model.entity.Post;
import com.blogapi.model.mapper.PostMapper;
import com.blogapi.repository.CategoryRepository;
import com.blogapi.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Enables Mockito extensions to handle mock creation and annotation injection automatically
@ExtendWith(MockitoExtension.class)
class PostServiceTest {

    // Creates mock object wrapper for PostRepository persistence dependencies
    @Mock
    private PostRepository postRepository;

    // Creates mock object wrapper for CategoryRepository persistence dependencies
    @Mock
    private CategoryRepository categoryRepository;

    // Creates mock object wrapper for PostMapper entity/DTO conversions
    @Mock
    private PostMapper postMapper;

    // Injects the mocks registered above into the PostService instance
    @InjectMocks
    private PostService postService;

    // Declares testing models
    private Post post;
    private Category category;
    private PostRequest postRequest;
    private PostResponse postResponse;

    // Setup helper methods to define initial entity conditions before each test runs
    @BeforeEach
    void setUp() {
        // Initialize Category entity model mock
        category = Category.builder().id(1L).name("Tech").description("Technology").build();
        // Initialize Post entity model mock
        post = Post.builder().id(1L).title("Title").content("Content info here").author("Author").category(category).createdAt(LocalDateTime.now()).updatedAt(LocalDateTime.now()).build();
        
        // Initialize PostRequest request mock
        postRequest = new PostRequest();
        postRequest.setTitle("Title");
        postRequest.setContent("Content info here");
        postRequest.setAuthor("Author");
        postRequest.setCategoryId(1L);

        // Initialize PostResponse response mock
        postResponse = PostResponse.builder().id(1L).title("Title").content("Content info here").author("Author").categoryId(1L).categoryName("Tech").build();
    }

    // Checks that retrieving paginated posts lists succeeds
    @Test
    void getAllPosts_Success() {
        // Configure page requests and expected page models
        Pageable pageable = PageRequest.of(0, 10);
        Page<Post> page = new PageImpl<>(Collections.singletonList(post));
        
        // Stub repository to return expected pages
        when(postRepository.findAll(pageable)).thenReturn(page);
        // Stub mapper converter DTO returns
        when(postMapper.toResponse(post)).thenReturn(postResponse);

        // Execute service target call
        Page<PostResponse> result = postService.getAllPosts(pageable);

        // Verify result content and sizes
        assertNotNull(result);
        assertEquals(1, result.getContent().size());
        assertEquals("Title", result.getContent().get(0).getTitle());
    }

    // Checks that finding a post by its ID succeeds
    @Test
    void getPostById_Success() {
        // Stub repository query to return post entity wrapper
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        // Stub response mapper conversion
        when(postMapper.toResponse(post)).thenReturn(postResponse);

        // Execute service target call
        PostResponse result = postService.getPostById(1L);

        // Assert response values match defined return attributes
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    // Checks that querying invalid Post IDs raises ResourceNotFoundException
    @Test
    void getPostById_ThrowsNotFound() {
        // Stub repository query to return empty Optional wrapper
        when(postRepository.findById(1L)).thenReturn(Optional.empty());

        // Asserts exception is raised
        assertThrows(ResourceNotFoundException.class, () -> postService.getPostById(1L));
    }

    // Checks that creating a post succeeds
    @Test
    void createPost_Success() {
        // Stub category presence checks
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        // Stub entity mapper conversion
        when(postMapper.toEntity(postRequest, category)).thenReturn(post);
        // Stub repository save action
        when(postRepository.save(post)).thenReturn(post);
        // Stub response mapper conversion
        when(postMapper.toResponse(post)).thenReturn(postResponse);

        // Execute save method target
        PostResponse result = postService.createPost(postRequest);

        // Verify return payload properties
        assertNotNull(result);
        assertEquals("Title", result.getTitle());
    }

    // Checks that editing an existing post succeeds
    @Test
    void updatePost_Success() {
        // Stub target post search check
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        // Stub repository save action
        when(postRepository.save(post)).thenReturn(post);
        // Stub response mapper conversion
        when(postMapper.toResponse(post)).thenReturn(postResponse);

        // Execute save update method target
        PostResponse result = postService.updatePost(1L, postRequest);

        // Assert output name matches request value
        assertNotNull(result);
        assertEquals("Title", result.getTitle());
    }

    // Checks that deleting a post runs successfully
    @Test
    void deletePost_Success() {
        // Stub post existence checks to return true
        when(postRepository.existsById(1L)).thenReturn(true);
        // Configure void mock invocation on delete action
        doNothing().when(postRepository).deleteById(1L);

        // Verify execution finishes without raising errors
        assertDoesNotThrow(() -> postService.deletePost(1L));
        // Verify repository deletion sequence is triggered exactly once
        verify(postRepository, times(1)).deleteById(1L);
    }
}
