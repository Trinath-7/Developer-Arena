// Package declaration matching controllers package namespace
package com.blogapi.controller;

// Import DTOs, Services, Jackson ObjectMappers, Mockito frameworks and Spring MVC mock utilities
import com.blogapi.model.dto.CategoryRequest;
import com.blogapi.model.dto.CategoryResponse;
import com.blogapi.service.CategoryService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.when;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

// WebMvcTest isolates slice testing of CategoryController class, auto-configuring Web MVC components
@WebMvcTest(CategoryController.class)
class CategoryControllerTest {

    // Injecting MockMvc to simulate HTTP requests in unit tests without starting full server listeners
    @Autowired
    private MockMvc mockMvc;

    // Registers a Mockito mock bean instance for CategoryService inside the Spring test context
    @MockBean
    private CategoryService categoryService;

    // Jackson serialization component injected from spring test context
    @Autowired
    private ObjectMapper objectMapper;

    // Unit test checking category creation returns HTTP 201 CREATED status
    @Test
    void createCategory_ReturnsCreated() throws Exception {
        // Instantiate test Request DTO payload
        CategoryRequest request = new CategoryRequest();
        request.setName("Tech");

        // Instantiate expected Response DTO representation model
        CategoryResponse response = CategoryResponse.builder().id(1L).name("Tech").build();

        // Stub categoryService call: when mock is invoked with CategoryRequest return defined response model
        when(categoryService.createCategory(any(CategoryRequest.class))).thenReturn(response);

        // Perform MockMvc HTTP POST request and perform assertions on the response status and JSON payload properties
        mockMvc.perform(post("/api/categories")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                // Asserts HTTP response status is 201 CREATED
                .andExpect(status().isCreated())
                // Asserts JSON response body name property equals "Tech"
                .andExpect(jsonPath("$.name").value("Tech"));
    }
}
