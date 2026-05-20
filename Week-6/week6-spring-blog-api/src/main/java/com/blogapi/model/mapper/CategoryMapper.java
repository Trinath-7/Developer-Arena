// Declares package matching the model mapper package location
package com.blogapi.model.mapper;

// Import request/response DTOs and matching DB entities
import com.blogapi.model.dto.CategoryRequest;
import com.blogapi.model.dto.CategoryResponse;
import com.blogapi.model.entity.Category;
import org.springframework.stereotype.Component;

// Marks this mapper class as a Spring Component bean so it can be auto-wired elsewhere
@Component
public class CategoryMapper {

    // Converts a Category database entity into a CategoryResponse payload DTO
    public CategoryResponse toResponse(Category category) {
        // Return null if input entity is null to prevent NullPointerException
        if (category == null) {
            return null;
        }
        // Construct and return DTO using Lombok's Builder pattern
        return CategoryResponse.builder()
                .id(category.getId())
                .name(category.getName())
                .description(category.getDescription())
                .build();
    }

    // Converts a CategoryRequest input DTO into a Category database entity model
    public Category toEntity(CategoryRequest request) {
        // Return null if input request DTO is null
        if (request == null) {
            return null;
        }
        // Construct and return Entity model using Lombok's Builder pattern
        return Category.builder()
                .name(request.getName())
                .description(request.getDescription())
                .build();
    }
}
