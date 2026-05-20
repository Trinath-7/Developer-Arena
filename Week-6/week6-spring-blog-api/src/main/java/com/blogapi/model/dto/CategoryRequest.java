// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import validation constraints and Lombok annotations
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

// Automatically generates getters, setters, toString, equals and hashCode
@Data
public class CategoryRequest {
    
    // Constraint annotation: validates that the name is non-empty and non-whitespace
    @NotBlank(message = "Name is required")
    private String name;
    
    // Optional description string property
    private String description;
}
