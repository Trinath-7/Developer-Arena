// Declares package matching the directory hierarchy
package com.blogapi.controller;

// Import DTOs, Service and swagger/validation classes
import com.blogapi.model.dto.CommentRequest;
import com.blogapi.model.dto.CommentResponse;
import com.blogapi.service.CommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a Web REST controller
@RestController
// Base URL mappings for comment operations
@RequestMapping("/api/comments")
// Tagging comment endpoints under standard name in swagger
@Tag(name = "Comments", description = "Blog Comment Management APIs")
public class CommentController {

    // Service class dependency representing the comments operations
    private final CommentService commentService;

    // Injecting CommentService dependency via constructor
    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    // Handles HTTP GET to retrieve comments list associated with a postId
    @GetMapping("/post/{postId}")
    @Operation(summary = "Get comments by post", description = "Retrieve all comments for a specific post")
    public ResponseEntity<List<CommentResponse>> getCommentsByPostId(@PathVariable Long postId) {
        // Returns 200 OK along with comments list
        return ResponseEntity.ok(commentService.getCommentsByPostId(postId));
    }

    // Handles HTTP POST to create a comment
    @PostMapping
    @Operation(summary = "Create new comment", description = "Create a new comment on a post")
    public ResponseEntity<CommentResponse> createComment(@Valid @RequestBody CommentRequest request) {
        // Returns 201 CREATED with the comment representation response
        return ResponseEntity.status(HttpStatus.CREATED).body(commentService.createComment(request));
    }

    // Handles HTTP DELETE to remove comment by its ID
    @DeleteMapping("/{id}")
    @Operation(summary = "Delete comment", description = "Delete a comment by ID")
    public ResponseEntity<Void> deleteComment(@PathVariable Long id) {
        // Execute delete operation
        commentService.deleteComment(id);
        // Returns 204 NO CONTENT as response payload is empty
        return ResponseEntity.noContent().build();
    }
}
