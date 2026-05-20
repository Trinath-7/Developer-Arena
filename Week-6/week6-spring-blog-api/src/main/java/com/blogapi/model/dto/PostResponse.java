// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import Lombok templates and date modules
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

// Automatically generates getters, setters, toString, equals and hashCode
@Data
// Enables Builder patterns for simplified response model instantiation
@Builder
public class PostResponse {
    // Unique primary key table ID of the Post
    private Long id;
    
    // Title header of the Post
    private String title;
    
    // Main text content body of the Post
    private String content;
    
    // Author or publisher name of the Post
    private String author;
    
    // Injected target category primary key ID mapping
    private Long categoryId;
    
    // Injected target category name mapping representation
    private String categoryName;
    
    // Creation timestamp of the Post
    private LocalDateTime createdAt;
    
    // Last modification timestamp of the Post
    private LocalDateTime updatedAt;
}
