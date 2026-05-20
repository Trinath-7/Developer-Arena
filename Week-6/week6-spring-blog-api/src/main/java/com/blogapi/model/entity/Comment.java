// Package mapping matching persistence model package structure
package com.blogapi.model.entity;

// Import JPA specifications, Lombok shortcuts, Spring auditing listeners and dates
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;

// Configures class as a database-mapped persistent Entity
@Entity
// Maps this entity model to "comments" table in database schema
@Table(name = "comments")
// Lombok decorators to generate getter, setter, constructor, and builder pattern methods
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Enables listening for auditing database insert updates (createdDate)
@EntityListeners(AuditingEntityListener.class)
public class Comment {
    
    // Configures field as a primary key table ID
    @Id
    // Configures key generation using database auto-increment columns
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Configures database column content properties (non-nullable and of TEXT column type)
    @Column(nullable = false, columnDefinition = "TEXT")
    private String content;

    // Configures author database column to be non-nullable
    @Column(nullable = false)
    private String author;

    // Configures many-to-one mapping relationship linking to Post entity using LAZY loading
    @ManyToOne(fetch = FetchType.LAZY)
    // Customizes parent post key database column mapping
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;

    // Auditing annotation to automatically capture database insert timestamp
    @CreatedDate
    // Prevents column values from being overwritten or updated after creation
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;
}
