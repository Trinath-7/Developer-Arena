// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import validation constraints and Lombok annotations
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Automatically generates getters, setters, toString, equals and hashCode methods
@Data
public class CommentRequest {
    
    // Validates that comment content is not null, empty, or whitespace
    @NotBlank(message = "Content is required")
    private String content;

    // Validates that comment author is not null, empty, or whitespace
    @NotBlank(message = "Author is required")
    private String author;

    // Validates that associated postId is present and not null
    @NotNull(message = "Post ID is required")
    private Long postId;
}
