// Package declaration mapping exception package structure
package com.blogapi.exception;

// Imports Spring annotations for assigning status codes
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

// Configures this exception class to automatically return 404 NOT FOUND status to API client if thrown
@ResponseStatus(HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    
    // Constructor accepting a specific detail message
    public ResourceNotFoundException(String message) {
        // Pass the error message back to the base RuntimeException constructor
        super(message);
    }
}
