// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import Lombok templates
import lombok.Builder;
import lombok.Data;

// Automatically generates getters, setters, toString, equals and hashCode
@Data
// Enables Builder patterns for simplified response model instantiation
@Builder
public class CategoryResponse {
    // Unique primary key table ID of the Category
    private Long id;
    
    // Custom name identifier of the Category
    private String name;
    
    // Description text of the Category
    private String description;
}
