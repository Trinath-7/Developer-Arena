// Package namespace mapping for entity-DTO mappings
package com.blogapi.model.mapper;

// Import DTO schemas, Post relationships and DB Comment entity representations
import com.blogapi.model.dto.CommentRequest;
import com.blogapi.model.dto.CommentResponse;
import com.blogapi.model.entity.Comment;
import com.blogapi.model.entity.Post;
import org.springframework.stereotype.Component;

// Marks this mapping helper class as an auto-discoverable Spring Component bean
@Component
public class CommentMapper {

    // Converts a Comment database entity into a CommentResponse API DTO payload
    public CommentResponse toResponse(Comment comment) {
        // Return null if comment is null
        if (comment == null) {
            return null;
        }
        // Build the DTO response using properties from the database entity
        return CommentResponse.builder()
                .id(comment.getId())
                .content(comment.getContent())
                .author(comment.getAuthor())
                // Safe checks on parent post relation properties
                .postId(comment.getPost() != null ? comment.getPost().getId() : null)
                // Audit date automatically logged during record creation
                .createdAt(comment.getCreatedAt())
                .build();
    }

    // Converts incoming CommentRequest DTO body variables and matching Post entity into a DB Comment record entity
    public Comment toEntity(CommentRequest request, Post post) {
        // Return null if request content is missing
        if (request == null) {
            return null;
        }
        // Build entity model setting relations
        return Comment.builder()
                .content(request.getContent())
                .author(request.getAuthor())
                .post(post)
                .build();
    }
}
