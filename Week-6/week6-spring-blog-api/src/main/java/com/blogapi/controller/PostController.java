// Package mapping configuration
package com.blogapi.controller;

// Importing Post representation payloads (DTOs) and Service operations
import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;
import com.blogapi.service.PostService;
// Importing OpenAPI description definitions
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
// Importing validation and spring framework pagination abstractions
import jakarta.validation.Valid;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Declares that this class handles HTTP endpoints and returns JSON response payloads directly
@RestController
// Base routing pathway for posts endpoint handlers
@RequestMapping("/api/posts")
// Categorizes documentation for this controller under "Posts" section in OpenAPI Swagger documentation
@Tag(name = "Posts", description = "Blog Post Management APIs")
public class PostController {
    
    // Injected service reference which executes logical post updates
    private final PostService postService;
    
    // Constructor injection of PostService business logic component
    public PostController(PostService postService) {
        this.postService = postService;
    }
    
    // Handles GET requests to retrieve a list of posts
    @GetMapping
    @Operation(summary = "Get all posts", description = "Retrieve all blog posts with pagination and sorting")
    public ResponseEntity<Page<PostResponse>> getAllPosts(
            // Auto-extracts request pagination parameters (?page=0&size=10&sort=createdAt,desc) with fallback defaults
            @PageableDefault(size = 10, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        // Fetch paginated response from service layer
        Page<PostResponse> posts = postService.getAllPosts(pageable);
        // Return 200 OK along with paginated response metadata and list
        return ResponseEntity.ok(posts);
    }
    
    // Handles GET request to load details for a post by its ID
    @GetMapping("/{id}")
    @Operation(summary = "Get post by ID", description = "Retrieve a specific blog post by its ID")
    public ResponseEntity<PostResponse> getPostById(@PathVariable Long id) {
        // Fetch the individual post DTO
        PostResponse post = postService.getPostById(id);
        // Return 200 OK along with post payload
        return ResponseEntity.ok(post);
    }
    
    // Handles POST request to write a new post
    @PostMapping
    @Operation(summary = "Create new post", description = "Create a new blog post")
    public ResponseEntity<PostResponse> createPost(@Valid @RequestBody PostRequest postRequest) {
        // Saves post through service layer using parsed request body data
        PostResponse createdPost = postService.createPost(postRequest);
        // Return 201 CREATED along with new post model resource representation
        return ResponseEntity.status(HttpStatus.CREATED).body(createdPost);
    }
    
    // Handles PUT request to update properties of an existing post
    @PutMapping("/{id}")
    @Operation(summary = "Update post", description = "Update an existing blog post")
    public ResponseEntity<PostResponse> updatePost(
            // Maps the ID path parameter variable to the method parameter
            @PathVariable Long id,
            // Validates request criteria in PostRequest entity schema before executing
            @Valid @RequestBody PostRequest postRequest) {
        // Passes request model down to service layer for persistent update execution
        PostResponse updatedPost = postService.updatePost(id, postRequest);
        // Return 200 OK along with updated post values DTO
        return ResponseEntity.ok(updatedPost);
    }
    
    // Handles DELETE request to remove a post by its ID
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete post", description = "Delete a blog post by ID")
    public ResponseEntity<Void> deletePost(@PathVariable Long id) {
        // Execute service deletion sequence
        postService.deletePost(id);
        // Return 204 NO CONTENT as response body is empty
        return ResponseEntity.noContent().build();
    }
    
    // Handles GET requests to retrieve all posts grouped under a Category ID
    @GetMapping("/category/{categoryId}")
    @Operation(summary = "Get posts by category", description = "Retrieve all posts in a specific category")
    public ResponseEntity<List<PostResponse>> getPostsByCategory(@PathVariable Long categoryId) {
        // Query database list of posts matching key categoryId
        List<PostResponse> posts = postService.getPostsByCategory(categoryId);
        // Return 200 OK along with list
        return ResponseEntity.ok(posts);
    }
}
