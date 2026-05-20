// Package mapping matching repository packages
package com.blogapi.repository;

// Import Post entity models, Spring JPA interfaces and collection libraries
import com.blogapi.model.entity.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

// Interface extending JPA persistence operations for Post entities
public interface PostRepository extends JpaRepository<Post, Long> {
    
    // Automatically generates custom SQL "SELECT * FROM posts WHERE category_id = ?" query
    List<Post> findByCategoryId(Long categoryId);
    
    // Automatically generates paginated SQL query filtering posts by Category ID
    Page<Post> findByCategoryId(Long categoryId, Pageable pageable);
}
