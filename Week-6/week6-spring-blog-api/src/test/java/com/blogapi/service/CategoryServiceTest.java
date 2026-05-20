// Package path mapping
package com.blogapi.service;

// Import DTOs, entities, exceptions, repositories, mappers and mock frameworks
import com.blogapi.exception.ResourceNotFoundException;
import com.blogapi.model.dto.CategoryRequest;
import com.blogapi.model.dto.CategoryResponse;
import com.blogapi.model.entity.Category;
import com.blogapi.model.mapper.CategoryMapper;
import com.blogapi.repository.CategoryRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

import static org.junit.jupiter.api.Assertions.*;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.Mockito.*;

// Enables Mockito extensions to handle mock creation and annotation injection automatically
@ExtendWith(MockitoExtension.class)
class CategoryServiceTest {

    // Creates a Mockito mock instance for CategoryRepository dependency
    @Mock
    private CategoryRepository categoryRepository;

    // Creates a Mockito mock instance for CategoryMapper dependency
    @Mock
    private CategoryMapper categoryMapper;

    // Instantiates CategoryService and injects the declared mock dependencies into it
    @InjectMocks
    private CategoryService categoryService;

    // Declaration of reusable testing utility variables
    private Category category;
    private CategoryRequest categoryRequest;
    private CategoryResponse categoryResponse;

    // Run setup sequences initializing model templates before each test method execution
    @BeforeEach
    void setUp() {
        // Initialize Category entity model mock
        category = Category.builder()
                .id(1L)
                .name("Tech")
                .description("Technology posts")
                .build();

        // Initialize CategoryRequest DTO mock
        categoryRequest = new CategoryRequest();
        categoryRequest.setName("Tech");
        categoryRequest.setDescription("Technology posts");

        // Initialize CategoryResponse DTO mock
        categoryResponse = CategoryResponse.builder()
                .id(1L)
                .name("Tech")
                .description("Technology posts")
                .build();
    }

    // Checks that getAllCategories queries lists successfully and maps them
    @Test
    void getAllCategories_Success() {
        // Stub repository to return singleton category collection
        when(categoryRepository.findAll()).thenReturn(Collections.singletonList(category));
        // Stub mapper to return DTO response
        when(categoryMapper.toResponse(category)).thenReturn(categoryResponse);

        // Execute service target call
        List<CategoryResponse> result = categoryService.getAllCategories();

        // Verify return payload holds the matching name value
        assertNotNull(result);
        assertEquals(1, result.size());
        assertEquals("Tech", result.get(0).getName());
    }

    // Checks that retrieving categories by key ID maps models successfully
    @Test
    void getCategoryById_Success() {
        // Stub repository to return mock Category entity
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        // Stub mapper response conversion
        when(categoryMapper.toResponse(category)).thenReturn(categoryResponse);

        // Execute target service method
        CategoryResponse result = categoryService.getCategoryById(1L);

        // Verify return values
        assertNotNull(result);
        assertEquals(1L, result.getId());
    }

    // Checks that querying invalid Category IDs raises ResourceNotFoundExceptions
    @Test
    void getCategoryById_ThrowsNotFound() {
        // Stub repository to return empty Optional wrapper
        when(categoryRepository.findById(1L)).thenReturn(Optional.empty());

        // Asserts that exception of target type is thrown
        assertThrows(ResourceNotFoundException.class, () -> categoryService.getCategoryById(1L));
    }

    // Checks that category database creation is successfully recorded and mapped
    @Test
    void createCategory_Success() {
        // Stub entity conversion properties
        when(categoryMapper.toEntity(categoryRequest)).thenReturn(category);
        // Stub save action returns
        when(categoryRepository.save(category)).thenReturn(category);
        // Stub response mapping DTO conversions
        when(categoryMapper.toResponse(category)).thenReturn(categoryResponse);

        // Execute save method target
        CategoryResponse response = categoryService.createCategory(categoryRequest);
        
        // Assertions checking output
        assertNotNull(response);
        assertEquals("Tech", response.getName());
    }

    // Checks that updating categories modifies records and returns updated values DTO
    @Test
    void updateCategory_Success() {
        // Stub findById and save calls
        when(categoryRepository.findById(1L)).thenReturn(Optional.of(category));
        when(categoryRepository.save(category)).thenReturn(category);
        when(categoryMapper.toResponse(category)).thenReturn(categoryResponse);

        // Execute edit update sequence
        CategoryResponse response = categoryService.updateCategory(1L, categoryRequest);
        
        // Assert output name matches request value
        assertNotNull(response);
        assertEquals("Tech", response.getName());
    }

    // Checks that category deletion verification runs successfully
    @Test
    void deleteCategory_Success() {
        // Stub existence checks to return true
        when(categoryRepository.existsById(1L)).thenReturn(true);
        // Configure void mock invocation on delete action
        doNothing().when(categoryRepository).deleteById(1L);

        // Verify execution finishes without raising errors
        assertDoesNotThrow(() -> categoryService.deleteCategory(1L));
        // Verify repository deletion sequence is triggered exactly once
        verify(categoryRepository, times(1)).deleteById(1L);
    }
}
