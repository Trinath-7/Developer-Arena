// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import Lombok templates and date modules
import lombok.Builder;
import lombok.Data;
import java.time.LocalDateTime;

// Automatically generates getters, setters, toString, equals and hashCode methods
@Data
// Enables Builder patterns for simplified response model instantiation
@Builder
public class CommentResponse {
    // Unique primary key table ID of the Comment
    private Long id;
    
    // Main text content body of the Comment
    private String content;
    
    // Author or publisher name of the Comment
    private String author;
    
    // Injected parent post primary key ID mapping
    private Long postId;
    
    // Creation timestamp of the Comment
    private LocalDateTime createdAt;
}
