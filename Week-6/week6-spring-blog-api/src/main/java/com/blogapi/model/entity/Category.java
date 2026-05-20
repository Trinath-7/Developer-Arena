// Package namespace for domain persistence entities
package com.blogapi.model.entity;

// Import JPA specifications, Lombok attributes, Spring auditing and date libraries
import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import java.time.LocalDateTime;
import java.util.List;

// Marks class as a database-mapped persistent entity
@Entity
// Maps this entity model to "categories" table in database schema
@Table(name = "categories")
// Lombok annotations to automatically generate getters, setters, constructors, and builder pattern
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
// Enables listening for auditing events (creation date, modification date)
@EntityListeners(AuditingEntityListener.class)
public class Category {
    
    // Configures the field as a primary key table ID
    @Id
    // Configures the key generation scheme as database identity auto-increment columns
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Configures column constraint properties: must be non-null and value must be unique in table
    @Column(nullable = false, unique = true)
    private String name;

    // Direct string field matching description column
    private String description;

    // Configures one-to-many relationship linking with Post entities using category property mapping
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts;

    // Auditing annotation to automatically capture database insert timestamp
    @CreatedDate
    // Prevents column values from being overwritten or updated after creation
    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt;

    // Auditing annotation to automatically capture database modification timestamp
    @LastModifiedDate
    private LocalDateTime updatedAt;
}
