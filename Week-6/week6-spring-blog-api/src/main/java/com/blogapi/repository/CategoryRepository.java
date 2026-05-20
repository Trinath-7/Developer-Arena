// Package mapping matching repository packages
package com.blogapi.repository;

// Import Category DB Entity and JpaRepository
import com.blogapi.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

// Defines repository interface inheriting CRUD/Pagination queries on Category table from JpaRepository
public interface CategoryRepository extends JpaRepository<Category, Long> {
    // Standard CRUD query implementations are generated dynamically by Spring Data JPA
}
