// Package route mapping
package com.blogapi.controller;

// Import DTOs, Service levels, Mockito dependencies, spring tests and json mappers
import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;
import com.blogapi.service.PostService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// Auto-configures web layers specifically focusing on testing PostController
@WebMvcTest(PostController.class)
class PostControllerTest {

    // Simulates HTTP requests directly in the testing environment
    @Autowired
    private MockMvc mockMvc;

    // Registers a mock bean for post operations
    @MockBean
    private PostService postService;

    // JSON serialization mapping utility
    @Autowired
    private ObjectMapper objectMapper;

    // Checks that createPost returns 201 Created and response content
    @Test
    void createPost_ReturnsCreated() throws Exception {
        // Instantiate mock Request DTO payload
        PostRequest request = new PostRequest();
        request.setTitle("Post Title");
        request.setContent("This is a post content.");
        request.setAuthor("John Doe");
        request.setCategoryId(1L);

        // Instantiate simulated response model
        PostResponse response = PostResponse.builder()
                .id(1L)
                .title("Post Title")
                .content("This is a post content.")
                .author("John Doe")
                .categoryId(1L)
                .categoryName("Tech")
                .build();

        // Configure Mockito stub return values when service is triggered
        when(postService.createPost(any(PostRequest.class))).thenReturn(response);

        // Execute API call simulation and perform response verification checks
        mockMvc.perform(post("/api/posts")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                // Verify status code is 201 Created
                .andExpect(status().isCreated())
                // Verify body content properties
                .andExpect(jsonPath("$.title").value("Post Title"))
                .andExpect(jsonPath("$.author").value("John Doe"));
    }

    // Checks that fetching a post by its ID returns HTTP 200 OK along with detailed post properties
    @Test
    void getPostById_ReturnsOk() throws Exception {
        // Instantiate mock response DTO
        PostResponse response = PostResponse.builder()
                .id(1L)
                .title("Post Title")
                .content("This is a post content.")
                .author("John Doe")
                .categoryId(1L)
                .categoryName("Tech")
                .build();

        // Stub service response return
        when(postService.getPostById(1L)).thenReturn(response);

        // Execute HTTP GET call simulation and check body properties
        mockMvc.perform(get("/api/posts/{id}", 1L))
                // Verify HTTP status is 200 OK
                .andExpect(status().isOk())
                // Verify title property matches expected values
                .andExpect(jsonPath("$.title").value("Post Title"));
    }
}
