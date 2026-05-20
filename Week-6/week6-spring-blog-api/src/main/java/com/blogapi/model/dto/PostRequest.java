// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import validation constraints and Lombok annotations
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

// Automatically generates getters, setters, toString, equals and hashCode methods
@Data
public class PostRequest {
    
    // Validates that title is not null, empty, or whitespace
    @NotBlank(message = "Title is required")
    private String title;

    // Validates that content is not null, empty, or whitespace
    @NotBlank(message = "Content is required")
    private String content;

    // Validates that author is not null, empty, or whitespace
    @NotBlank(message = "Author is required")
    private String author;

    // Validates that categoryId parameter is present and not null
    @NotNull(message = "Category ID is required")
    private Long categoryId;
}
