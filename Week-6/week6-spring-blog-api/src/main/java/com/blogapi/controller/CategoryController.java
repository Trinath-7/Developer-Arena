// Package declaration matching folder layout
package com.blogapi.controller;

// Import DTOs and Services
import com.blogapi.model.dto.CategoryRequest;
import com.blogapi.model.dto.CategoryResponse;
import com.blogapi.service.CategoryService;
// Import Swagger/OpenAPI annotations for documentation
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
// Import validation annotation
import jakarta.validation.Valid;
// Import Spring MVC annotations
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

// Marks this class as a REST Controller where handler methods return JSON bodies directly
@RestController
// Sets the base URI path for all endpoints in this controller
@RequestMapping("/api/categories")
// Tags this controller under "Categories" for OpenAPI UI organization
@Tag(name = "Categories", description = "Blog Category Management APIs")
public class CategoryController {
    
    // Injected business logic service dependency
    private final CategoryService categoryService;
    
    // Constructor injection for CategoryService dependency injection
    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }
    
    // HTTP GET handler to fetch all categories
    @GetMapping
    // Documents the operation in Swagger UI
    @Operation(summary = "Get all categories", description = "Retrieve all blog categories")
    public ResponseEntity<List<CategoryResponse>> getAllCategories() {
        // Return 200 OK with the list of categories
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
    
    // HTTP GET handler to retrieve a category by its unique ID
    @GetMapping("/{id}")
    // Documents the operation in Swagger UI
    @Operation(summary = "Get category by ID", description = "Retrieve a specific category by its ID")
    public ResponseEntity<CategoryResponse> getCategoryById(@PathVariable Long id) {
        // Return 200 OK with the specific category response
        return ResponseEntity.ok(categoryService.getCategoryById(id));
    }
    
    // HTTP POST handler to create a new category
    @PostMapping
    // Documents the operation in Swagger UI
    @Operation(summary = "Create new category", description = "Create a new blog category")
    public ResponseEntity<CategoryResponse> createCategory(@Valid @RequestBody CategoryRequest request) {
        // Return 201 CREATED containing the newly saved category DTO
        return ResponseEntity.status(HttpStatus.CREATED).body(categoryService.createCategory(request));
    }
    
    // HTTP PUT handler to update an existing category by its ID
    @PutMapping("/{id}")
    // Documents the operation in Swagger UI
    @Operation(summary = "Update category", description = "Update an existing category")
    public ResponseEntity<CategoryResponse> updateCategory(
            // Binds the URL template variable {id} to the Java method parameter
            @PathVariable Long id,
            // Validates the request body fields against constraints (like @NotBlank) before executing
            @Valid @RequestBody CategoryRequest request) {
        // Return 200 OK with the updated category details
        return ResponseEntity.ok(categoryService.updateCategory(id, request));
    }
    
    // HTTP DELETE handler to remove a category by ID
    @DeleteMapping("/{id}")
    // Documents the operation in Swagger UI
    @Operation(summary = "Delete category", description = "Delete a category by ID")
    public ResponseEntity<Void> deleteCategory(@PathVariable Long id) {
        // Call the service layer to delete the resource
        categoryService.deleteCategory(id);
        // Return 204 NO CONTENT as the entity has been deleted and there's no response body
        return ResponseEntity.noContent().build();
    }
}
