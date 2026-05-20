// Package mapping for service layers
package com.blogapi.service;

// Importing necessary dependencies (DTOs, entities, mappers, repositories)
import com.blogapi.model.dto.CategoryRequest;
import com.blogapi.model.dto.CategoryResponse;
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.entity.Category;
import com.blogapi.repository.CategoryRepository;
import com.blogapi.model.mapper.CategoryMapper;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

// Marks this class as a Spring Service bean containing business logic
@Service
// Lombok annotation to automatically generate a constructor for final fields (dependency injection)
@RequiredArgsConstructor
// Marks all methods inside this class to execute within a transactional context
@Transactional
public class CategoryService {
    // Repository for Category database persistence queries
    private final CategoryRepository categoryRepository;
    // Mapper for Category entity and DTO conversions
    private final CategoryMapper categoryMapper;

    // Retrieves all categories from the database and maps them to DTO representations
    public List<CategoryResponse> getAllCategories() {
        // Query list from repository, convert each entity to response payload, and collect to list
        return categoryRepository.findAll().stream()
                .map(categoryMapper::toResponse)
                .collect(Collectors.toList());
    }

    // Fetches category details by ID, throwing ResourceNotFoundException if it doesn't exist
    public CategoryResponse getCategoryById(Long id) {
        // Search in repository, throw exception if entity is not found
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        // Return mapped DTO response
        return categoryMapper.toResponse(category);
    }

    // Saves a new category database record from the category request payload
    public CategoryResponse createCategory(CategoryRequest request) {
        // Convert Request payload variables into category entity model
        Category category = categoryMapper.toEntity(request);
        // Persist entity model inside database
        Category saved = categoryRepository.save(category);
        // Map saved entity state to Response DTO
        return categoryMapper.toResponse(saved);
    }

    // Modifies properties of an existing category by its database primary key
    public CategoryResponse updateCategory(Long id, CategoryRequest request) {
        // Load target category from repository
        Category category = categoryRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Category not found with id: " + id));
        // Update attributes with request values
        category.setName(request.getName());
        category.setDescription(request.getDescription());
        // Save the updated category entity back and return the mapped DTO response
        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    // Removes a category record from the database by ID
    public void deleteCategory(Long id) {
        // Confirm resource presence before performing database removal
        if (!categoryRepository.existsById(id)) {
            throw new ResourceNotFoundException("Category not found with id: " + id);
        }
        // Delete database record
        categoryRepository.deleteById(id);
    }
}
