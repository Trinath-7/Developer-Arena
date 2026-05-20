// Package mapping configuration
package com.blogapi.service;

// Import DTO schemas, entity models, exceptions, repositories, mappers and mock frameworks
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.dto.CommentRequest;
import com.blogapi.model.dto.CommentResponse;
import com.blogapi.model.entity.Comment;
import com.blogapi.model.entity.Post;
import com.blogapi.model.mapper.CommentMapper;
import com.blogapi.repository.CommentRepository;
import com.blogapi.repository.PostRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Enables Mockito extensions to handle mock creation and annotation injection automatically
@ExtendWith(MockitoExtension.class)
class CommentServiceTest {

    // Registers a mockito mock instance for CommentRepository
    @Mock
    private CommentRepository commentRepository;

    // Registers a mockito mock instance for PostRepository
    @Mock
    private PostRepository postRepository;

    // Registers a mockito mock instance for CommentMapper
    @Mock
    private CommentMapper commentMapper;

    // Injects the mocks registered above into the CommentService target instance
    @InjectMocks
    private CommentService commentService;

    // Declares testing utility models
    private Post post;
    private Comment comment;
    private CommentRequest commentRequest;
    private CommentResponse commentResponse;

    // Setup helper methods to define initial entity conditions before each test runs
    @BeforeEach
    void setUp() {
        // Initialize parent Post entity
        post = Post.builder().id(1L).title("Title").content("Content").author("Author").build();
        // Initialize Comment entity model
        comment = Comment.builder().id(1L).content("Awesome post").author("Alice").post(post).createdAt(LocalDateTime.now()).build();
        
        // Initialize CommentRequest request mock
        commentRequest = new CommentRequest();
        commentRequest.setContent("Awesome post");
        commentRequest.setAuthor("Alice");
        commentRequest.setPostId(1L);

        // Initialize CommentResponse response mock
        commentResponse = CommentResponse.builder().id(1L).content("Awesome post").author("Alice").postId(1L).build();
    }

    // Checks that retrieving comments list matching a postId succeeds
    @Test
    void getCommentsByPostId_Success() {
        // Stub existence check validation to return true
        when(postRepository.existsById(1L)).thenReturn(true);
        // Stub comment query check to return mock comment singleton collection
        when(commentRepository.findByPostId(1L)).thenReturn(Collections.singletonList(comment));
        // Stub mapper conversion
        when(commentMapper.toResponse(comment)).thenReturn(commentResponse);

        // Execute service target call
        List<CommentResponse> result = commentService.getCommentsByPostId(1L);

        // Verify result content and sizes
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Awesome post", result.get(0).getContent());
    }

    // Checks that retrieving comments list matching invalid post IDs raises ResourceNotFoundException
    @Test
    void getCommentsByPostId_ThrowsNotFound() {
        // Stub post presence check to return false
        when(postRepository.existsById(1L)).thenReturn(false);

        // Asserts exception is raised
        assertThrows(ResourceNotFoundException.class, () -> commentService.getCommentsByPostId(1L));
    }

    // Checks that creating a comment succeeds
    @Test
    void createComment_Success() {
        // Stub parent Post entity check returns
        when(postRepository.findById(1L)).thenReturn(Optional.of(post));
        // Stub entity mapper conversion
        when(commentMapper.toEntity(commentRequest, post)).thenReturn(comment);
        // Stub repository save action
        when(commentRepository.save(comment)).thenReturn(comment);
        // Stub response mapper conversion
        when(commentMapper.toResponse(comment)).thenReturn(commentResponse);

        // Execute save method target
        CommentResponse result = commentService.createComment(commentRequest);

        // Assert response content matches request attributes
        assertNotNull(result);
        assertEquals("Awesome post", result.getContent());
    }

    // Checks that deleting a comment runs successfully
    @Test
    void deleteComment_Success() {
        // Stub comment existence checks to return true
        when(commentRepository.existsById(1L)).thenReturn(true);
        // Configure void mock invocation on delete action
        doNothing().when(commentRepository).deleteById(1L);

        // Verify execution finishes without raising errors
        assertDoesNotThrow(() -> commentService.deleteComment(1L));
        // Verify repository deletion sequence is triggered exactly once
        verify(commentRepository, times(1)).deleteById(1L);
    }
}
