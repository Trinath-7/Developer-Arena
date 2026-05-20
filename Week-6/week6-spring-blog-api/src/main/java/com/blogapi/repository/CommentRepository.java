// Package mapping matching repository packages
package com.blogapi.repository;

// Import Comment entity models, JPA interfaces and collection classes
import com.blogapi.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Interface extending JPA persistence operations for Comment entities
public interface CommentRepository extends JpaRepository<Comment, Long> {
    
    // Automatically generates custom SQL "SELECT * FROM comments WHERE post_id = ?" query
    List<Comment> findByPostId(Long postId);
}
