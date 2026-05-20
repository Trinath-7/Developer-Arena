// Package mapping matching exception package structure
package com.blogapi.exception;

// Import API response template, Spring HTTP utilities and exception classes
import com.blogapi.model.dto.ApiResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

// Declares this class as a global advisor that intercepts exceptions thrown by REST controllers
@ControllerAdvice
public class GlobalExceptionHandler {

    // Handles ResourceNotFoundException, returning custom error format and 404 HTTP status
    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ApiResponse<Object>> handleResourceNotFoundException(ResourceNotFoundException ex) {
        // Construct standard error payload DTO
        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        // Return 404 NOT FOUND status with error body
        return new ResponseEntity<>(response, HttpStatus.NOT_FOUND);
    }

    // Handles request body validation check errors (e.g. invalid email, blank content) returning 400 status
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<ApiResponse<Map<String, String>>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        // Extract validation field messages and map them as key-value pairs (field -> error msg)
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String errorMessage = error.getDefaultMessage();
            errors.put(fieldName, errorMessage);
        });
        
        // Construct structured API response enclosing validation details
        ApiResponse<Map<String, String>> response = ApiResponse.<Map<String, String>>builder()
                .success(false)
                .message("Validation failed")
                .data(errors)
                .timestamp(LocalDateTime.now())
                .build();
        // Return 400 BAD REQUEST status with errors payload
        return new ResponseEntity<>(response, HttpStatus.BAD_REQUEST);
    }

    // Catch-all general exception handler to prevent leak of detailed backend stack traces to API clients
    @ExceptionHandler(Exception.class)
    public ResponseEntity<ApiResponse<Object>> handleGlobalException(Exception ex) {
        // Construct standardized internal server error wrapper DTO
        ApiResponse<Object> response = ApiResponse.builder()
                .success(false)
                .message(ex.getMessage())
                .timestamp(LocalDateTime.now())
                .build();
        // Return 500 INTERNAL SERVER ERROR status
        return new ResponseEntity<>(response, HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
