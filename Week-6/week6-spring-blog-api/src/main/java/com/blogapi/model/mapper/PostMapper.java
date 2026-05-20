// Package path declaration
package com.blogapi.model.mapper;

// Import DTO templates, Category relationships, and Post entities
import com.blogapi.model.dto.PostRequest;
import com.blogapi.model.dto.PostResponse;
import com.blogapi.model.entity.Category;
import com.blogapi.model.entity.Post;
import org.springframework.stereotype.Component;

// Registers this mapper class as an injectable Spring component bean
@Component
public class PostMapper {

    // Converts a Post entity containing category references and auditing fields into a PostResponse DTO
    public PostResponse toResponse(Post post) {
        // Return null if post is null to prevent null reference issues
        if (post == null) {
            return null;
        }
        // Build the DTO response model
        return PostResponse.builder()
                .id(post.getId())
                .title(post.getTitle())
                .content(post.getContent())
                .author(post.getAuthor())
                // Safe navigation checks on nested Category relations to read details
                .categoryId(post.getCategory() != null ? post.getCategory().getId() : null)
                .categoryName(post.getCategory() != null ? post.getCategory().getName() : null)
                // Audit dates automatically managed by JPA Auditing configuration
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .build();
    }

    // Converts incoming PostRequest DTO attributes and matching Category entity into a database Post entity
    public Post toEntity(PostRequest request, Category category) {
        // Return null if request payload is null
        if (request == null) {
            return null;
        }
        // Build the Post entity model referencing the Category
        return Post.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .author(request.getAuthor())
                .category(category)
                .build();
    }
}
