// Package path mapping
package com.blogapi.controller;

// Import DTO representations, CommentService layers, mockito frameworks, spring tests and json mappers
import com.blogapi.model.dto.CommentRequest;
import com.blogapi.model.dto.CommentResponse;
import com.blogapi.service.CommentService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Confires web mvc controller slice testing isolating CommentController
@WebMvcTest(CommentController.class)
class CommentControllerTest {

    // Spring autowired mock mvc component simulating client request pipelines
    @Autowired
    private MockMvc mockMvc;

    // Registers a mockito wrapper for comment business logic
    @MockBean
    private CommentService commentService;

    // ObjectMapper utility serialization handler
    @Autowired
    private ObjectMapper objectMapper;

    // Checks that createComment returns 201 Created and response content
    @Test
    void createComment_ReturnsCreated() throws Exception {
        // Instantiate test payload
        CommentRequest request = new CommentRequest();
        request.setContent("This is a comment.");
        request.setAuthor("Alice");
        request.setPostId(1L);

        // Instantiate simulated service return response
        CommentResponse response = CommentResponse.builder()
                .id(1L)
                .content("This is a comment.")
                .author("Alice")
                .postId(1L)
                .build();

        // Instruct Mockito to return expected response DTO when createComment is invoked
        when(commentService.createComment(any(CommentRequest.class))).thenReturn(response);

        // Run HTTP POST call simulation and perform assertions on the response status and returned JSON values
        mockMvc.perform(post("/api/comments")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                // Verify returned response is 201 Created
                .andExpect(status().isCreated())
                // Verify content and author properties in response
                .andExpect(jsonPath("$.content").value("This is a comment."))
                .andExpect(jsonPath("$.author").value("Alice"));
    }

    // Checks that retrieving comments matching a postId returns HTTP 200 OK along with comments list
    @Test
    void getCommentsByPostId_ReturnsOk() throws Exception {
        // Build mock comment response
        CommentResponse response = CommentResponse.builder()
                .id(1L)
                .content("This is a comment.")
                .author("Alice")
                .postId(1L)
                .build();

        // Stub service response return list
        when(commentService.getCommentsByPostId(1L)).thenReturn(Collections.singletonList(response));

        // Perform HTTP GET call simulation and check return status and payload index contents
        mockMvc.perform(get("/api/comments/post/{postId}", 1L))
                // Verify HTTP Status is 200 OK
                .andExpect(status().isOk())
                // Verify first item content matches expected string
                .andExpect(jsonPath("$[0].content").value("This is a comment."));
    }
}
