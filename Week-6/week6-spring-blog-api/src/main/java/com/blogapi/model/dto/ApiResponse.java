// Package mapping matching DTO packages
package com.blogapi.model.dto;

// Import Lombok templates and date modules
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.time.LocalDateTime;

// Generates getter, setter, toString, equals and hashCode methods automatically
@Data
// Generates default no-argument constructor
@NoArgsConstructor
// Generates parameterized constructor accepting values for all fields
@AllArgsConstructor
// Enables builder patterns for simplified object initialization
@Builder
public class ApiResponse<T> {
    // Flag detailing if request action was executed successfully
    private boolean success;
    
    // Status descriptor or error details message string
    private String message;
    
    // Optional generic data payload returned to client (e.g. lists, map errors)
    private T data;
    
    // Time instant log detailing when response occurred
    private LocalDateTime timestamp;
}
