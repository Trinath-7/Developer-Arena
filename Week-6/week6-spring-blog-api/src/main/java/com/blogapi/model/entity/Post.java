// Package namespace for domain persistence entities
package com.blogapi.model.entity;

// Import JPA specifications, Lombok utilities, and Auditing annotations
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.List;

// Marks class as a database-mapped JPA Entity
@Entity
// Maps this entity model to "posts" table in database schema
@Table(name = "posts")
// Lombok decorators to generate getter, setter, constructor, and builder pattern methods
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Enables listening for auditing lifecycle events (createdDate, lastModifiedDate)
@EntityListeners(AuditingEntityListener.class)
public class Post {
    
    // Identifies field as primary key table ID
    @Id
    // Configures auto-increment sequence columns for primary key values
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Configures title database column to be non-nullable
    @Column(nullable = false)
    private String title;

    // Configures content database column as text type to support longer characters
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    // Configures author database column to be non-nullable
    @Column(nullable = false)
    private String author;

    // Configures many-to-one mapping relationship linking to Category entity using LAZY loading
    @ManyToOne(fetch = FetchType.LAZY)
    // Customizes foreign key database column mapping
    @JoinColumn(name = "category_id", nullable = false)
    private Category category;

    // Configures one-to-many relationship linking with Comment entities with cascade deletion options
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments;

    // Auditing annotation to automatically capture database insert timestamp
    @CreatedDate
    // Prevents column values from being updated after creation
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Auditing annotation to automatically capture database modification timestamp
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
