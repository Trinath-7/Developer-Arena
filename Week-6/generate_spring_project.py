import os

def write_file(filepath, content):
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content.strip() + '\n')

# Define paths
base_dir = "week6-spring-blog-api"
java_dir = os.path.join(base_dir, "src/main/java/com/blog/api")
res_dir = os.path.join(base_dir, "src/main/resources")
test_dir = os.path.join(base_dir, "src/test/java/com/blog/api")
docs_dir = os.path.join(base_dir, "docs")

files = {}

files[f"{base_dir}/pom.xml"] = """
<?xml version="1.0" encoding="UTF-8"?>
<project xmlns="http://maven.apache.org/POM/4.0.0" xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
         xsi:schemaLocation="http://maven.apache.org/POM/4.0.0 https://maven.apache.org/xsd/maven-4.0.0.xsd">
    <modelVersion>4.0.0</modelVersion>
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>3.2.5</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>
    <groupId>com.blog</groupId>
    <artifactId>blog-api</artifactId>
    <version>0.0.1-SNAPSHOT</version>
    <name>blog-api</name>
    <description>Blog Management REST API</description>
    <properties>
        <java.version>17</java.version>
    </properties>
    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-data-jpa</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-validation</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>com.h2database</groupId>
            <artifactId>h2</artifactId>
            <scope>runtime</scope>
        </dependency>
        <dependency>
            <groupId>org.projectlombok</groupId>
            <artifactId>lombok</artifactId>
            <optional>true</optional>
        </dependency>
        <dependency>
            <groupId>org.springdoc</groupId>
            <artifactId>springdoc-openapi-starter-webmvc-ui</artifactId>
            <version>2.5.0</version>
        </dependency>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-test</artifactId>
            <scope>test</scope>
        </dependency>
    </dependencies>
    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
</project>
"""

files[f"{res_dir}/application.properties"] = """
# Server Port
server.port=8080

# H2 Database Configuration
spring.datasource.url=jdbc:h2:mem:blogdb
spring.datasource.driverClassName=org.h2.Driver
spring.datasource.username=sa
spring.datasource.password=password
spring.jpa.database-platform=org.hibernate.dialect.H2Dialect

# H2 Console
spring.h2.console.enabled=true
spring.h2.console.path=/h2-console

# JPA / Hibernate
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.format_sql=true
spring.jpa.defer-datasource-initialization=true

# Logging
logging.level.org.hibernate.SQL=DEBUG
logging.level.org.springframework.web=INFO
logging.level.com.blog.api=DEBUG
"""

files[f"{res_dir}/data.sql"] = """
INSERT INTO categories (name, description) VALUES ('Technology', 'All tech related posts');
INSERT INTO categories (name, description) VALUES ('Lifestyle', 'Lifestyle and daily routines');

INSERT INTO posts (title, content, author, category_id) VALUES ('Spring Boot 3 Intro', 'Introduction to Spring Boot 3 and Java 17', 'John Doe', 1);
INSERT INTO posts (title, content, author, category_id) VALUES ('Healthy Habits', 'How to stay healthy while coding', 'Jane Doe', 2);

INSERT INTO comments (name, email, body, post_id) VALUES ('Alice', 'alice@example.com', 'Great post!', 1);
"""

files[f"{java_dir}/BlogApiApplication.java"] = """
package com.blog.api;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/**
 * Main application class for the Blog API.
 * Uses @SpringBootApplication which encapsulates @Configuration, @EnableAutoConfiguration, and @ComponentScan.
 */
@SpringBootApplication
public class BlogApiApplication {
    public static void main(String[] args) {
        SpringApplication.run(BlogApiApplication.class, args);
    }
}
"""

files[f"{java_dir}/model/entity/Category.java"] = """
package com.blog.api.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Category Entity representing the categories table in the database.
 * Demonstrates One-to-Many relationship with Post.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "categories")
public class Category {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String description;

    // One Category can have many Posts
    @OneToMany(mappedBy = "category", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Post> posts = new ArrayList<>();
}
"""

files[f"{java_dir}/model/entity/Post.java"] = """
package com.blog.api.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

/**
 * Post Entity representing the posts table in the database.
 * Demonstrates Many-to-One relationship with Category and One-to-Many with Comment.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "posts")
public class Post {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "content", nullable = false)
    private String content;
    
    @Column(name = "author")
    private String author;

    // Many Posts belong to one Category
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    private Category category;

    // One Post can have many Comments
    @OneToMany(mappedBy = "post", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Comment> comments = new ArrayList<>();
}
"""

files[f"{java_dir}/model/entity/Comment.java"] = """
package com.blog.api.model.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

/**
 * Comment Entity representing the comments table.
 * Demonstrates Many-to-One relationship with Post.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "comments")
public class Comment {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String body;

    // Many Comments belong to one Post
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "post_id", nullable = false)
    private Post post;
}
"""

files[f"{java_dir}/model/dto/CategoryDto.java"] = """
package com.blog.api.model.dto;

import jakarta.validation.constraints.NotEmpty;
import lombok.Data;

/**
 * Data Transfer Object for Category.
 * Used to transfer data between client and server without exposing the database entity.
 */
@Data
public class CategoryDto {
    private Long id;
    
    @NotEmpty(message = "Name should not be empty")
    private String name;
    
    @NotEmpty(message = "Description should not be empty")
    private String description;
}
"""

files[f"{java_dir}/model/dto/PostDto.java"] = """
package com.blog.api.model.dto;

import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for Post.
 */
@Data
public class PostDto {
    private Long id;
    
    @NotEmpty
    @Size(min = 2, message = "Post title should have at least 2 characters")
    private String title;
    
    @NotEmpty
    @Size(min = 10, message = "Post content should have at least 10 characters")
    private String content;
    
    @NotEmpty(message = "Author should not be empty")
    private String author;
    
    private Long categoryId;
}
"""

files[f"{java_dir}/model/dto/CommentDto.java"] = """
package com.blog.api.model.dto;

import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.Size;
import lombok.Data;

/**
 * Data Transfer Object for Comment.
 */
@Data
public class CommentDto {
    private Long id;
    
    @NotEmpty(message = "Name should not be empty")
    private String name;
    
    @NotEmpty(message = "Email should not be empty")
    @Email(message = "Email format is not valid")
    private String email;
    
    @NotEmpty
    @Size(min = 10, message = "Comment body must be minimum 10 characters")
    private String body;
    
    private Long postId;
}
"""

files[f"{java_dir}/model/dto/PostResponse.java"] = """
package com.blog.api.model.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import java.util.List;

/**
 * Response wrapper for paginated posts.
 */
@Data
@NoArgsConstructor
@AllArgsConstructor
public class PostResponse {
    private List<PostDto> content;
    private int pageNo;
    private int pageSize;
    private long totalElements;
    private int totalPages;
    private boolean last;
}
"""

files[f"{java_dir}/exception/ResourceNotFoundException.java"] = """
package com.blog.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

/**
 * Custom exception to be thrown when a requested resource is not found in the database.
 */
@ResponseStatus(value = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {
    private String resourceName;
    private String fieldName;
    private long fieldValue;

    public ResourceNotFoundException(String resourceName, String fieldName, long fieldValue) {
        super(String.format("%s not found with %s : '%s'", resourceName, fieldName, fieldValue));
        this.resourceName = resourceName;
        this.fieldName = fieldName;
        this.fieldValue = fieldValue;
    }
}
"""

files[f"{java_dir}/exception/ErrorDetails.java"] = """
package com.blog.api.exception;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.util.Date;

/**
 * Model class to structure custom error responses.
 */
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ErrorDetails {
    private Date timestamp;
    private String message;
    private String details;
}
"""

files[f"{java_dir}/exception/GlobalExceptionHandler.java"] = """
package com.blog.api.exception;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.context.request.WebRequest;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

/**
 * Global Exception Handler to intercept and format exceptions across the whole application.
 * Uses @ControllerAdvice which allows handling exceptions across all @RequestMapping methods.
 */
@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(ResourceNotFoundException.class)
    public ResponseEntity<ErrorDetails> handleResourceNotFoundException(ResourceNotFoundException exception,
                                                                        WebRequest webRequest) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(Exception.class)
    public ResponseEntity<ErrorDetails> handleGlobalException(Exception exception,
                                                              WebRequest webRequest) {
        ErrorDetails errorDetails = new ErrorDetails(new Date(), exception.getMessage(),
                webRequest.getDescription(false));
        return new ResponseEntity<>(errorDetails, HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Object> handleMethodArgumentNotValid(MethodArgumentNotValidException ex, 
                                                               WebRequest request) {
        Map<String, String> errors = new HashMap<>();
        ex.getBindingResult().getAllErrors().forEach((error) -> {
            String fieldName = ((FieldError) error).getField();
            String message = error.getDefaultMessage();
            errors.put(fieldName, message);
        });
        return new ResponseEntity<>(errors, HttpStatus.BAD_REQUEST);
    }
}
"""

files[f"{java_dir}/repository/CategoryRepository.java"] = """
package com.blog.api.repository;

import com.blog.api.model.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

/**
 * Repository interface for Category entity.
 * Extends JpaRepository to get CRUD and pagination features.
 */
public interface CategoryRepository extends JpaRepository<Category, Long> {
}
"""

files[f"{java_dir}/repository/PostRepository.java"] = """
package com.blog.api.repository;

import com.blog.api.model.entity.Post;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository interface for Post entity.
 */
public interface PostRepository extends JpaRepository<Post, Long> {
    // Custom query method to find posts by category ID
    List<Post> findByCategoryId(Long categoryId);
    
    // Custom query method to find posts by author
    List<Post> findByAuthor(String author);
}
"""

files[f"{java_dir}/repository/CommentRepository.java"] = """
package com.blog.api.repository;

import com.blog.api.model.entity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

/**
 * Repository interface for Comment entity.
 */
public interface CommentRepository extends JpaRepository<Comment, Long> {
    // Custom query method to find comments by post ID
    List<Comment> findByPostId(Long postId);
}
"""

files[f"{java_dir}/service/CategoryService.java"] = """
package com.blog.api.service;

import com.blog.api.model.dto.CategoryDto;
import java.util.List;

public interface CategoryService {
    CategoryDto addCategory(CategoryDto categoryDto);
    CategoryDto getCategory(Long categoryId);
    List<CategoryDto> getAllCategories();
    CategoryDto updateCategory(CategoryDto categoryDto, Long categoryId);
    void deleteCategory(Long categoryId);
}
"""

files[f"{java_dir}/service/impl/CategoryServiceImpl.java"] = """
package com.blog.api.service.impl;

import com.blog.api.exception.ResourceNotFoundException;
import com.blog.api.model.dto.CategoryDto;
import com.blog.api.model.entity.Category;
import com.blog.api.repository.CategoryRepository;
import com.blog.api.service.CategoryService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CategoryServiceImpl implements CategoryService {

    private final CategoryRepository categoryRepository;

    public CategoryServiceImpl(CategoryRepository categoryRepository) {
        this.categoryRepository = categoryRepository;
    }

    @Override
    public CategoryDto addCategory(CategoryDto categoryDto) {
        Category category = new Category();
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        
        Category savedCategory = categoryRepository.save(category);
        return mapToDto(savedCategory);
    }

    @Override
    public CategoryDto getCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
        return mapToDto(category);
    }

    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public CategoryDto updateCategory(CategoryDto categoryDto, Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
        
        category.setName(categoryDto.getName());
        category.setDescription(categoryDto.getDescription());
        
        Category updatedCategory = categoryRepository.save(category);
        return mapToDto(updatedCategory);
    }

    @Override
    public void deleteCategory(Long categoryId) {
        Category category = categoryRepository.findById(categoryId)
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", categoryId));
        categoryRepository.delete(category);
    }

    private CategoryDto mapToDto(Category category) {
        CategoryDto dto = new CategoryDto();
        dto.setId(category.getId());
        dto.setName(category.getName());
        dto.setDescription(category.getDescription());
        return dto;
    }
}
"""

files[f"{java_dir}/service/PostService.java"] = """
package com.blog.api.service;

import com.blog.api.model.dto.PostDto;
import com.blog.api.model.dto.PostResponse;
import java.util.List;

public interface PostService {
    PostDto createPost(PostDto postDto);
    PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir);
    PostDto getPostById(Long id);
    PostDto updatePost(PostDto postDto, Long id);
    void deletePostById(Long id);
    List<PostDto> getPostsByCategory(Long categoryId);
    List<PostDto> getPostsByAuthor(String author);
}
"""

files[f"{java_dir}/service/impl/PostServiceImpl.java"] = """
package com.blog.api.service.impl;

import com.blog.api.exception.ResourceNotFoundException;
import com.blog.api.model.dto.PostDto;
import com.blog.api.model.dto.PostResponse;
import com.blog.api.model.entity.Category;
import com.blog.api.model.entity.Post;
import com.blog.api.repository.CategoryRepository;
import com.blog.api.repository.PostRepository;
import com.blog.api.service.PostService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final CategoryRepository categoryRepository;

    public PostServiceImpl(PostRepository postRepository, CategoryRepository categoryRepository) {
        this.postRepository = postRepository;
        this.categoryRepository = categoryRepository;
    }

    @Override
    public PostDto createPost(PostDto postDto) {
        Category category = categoryRepository.findById(postDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", postDto.getCategoryId()));

        Post post = new Post();
        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthor(postDto.getAuthor());
        post.setCategory(category);

        Post newPost = postRepository.save(post);
        return mapToDto(newPost);
    }

    @Override
    public PostResponse getAllPosts(int pageNo, int pageSize, String sortBy, String sortDir) {
        Sort sort = sortDir.equalsIgnoreCase(Sort.Direction.ASC.name()) ? Sort.by(sortBy).ascending()
                : Sort.by(sortBy).descending();

        Pageable pageable = PageRequest.of(pageNo, pageSize, sort);
        Page<Post> posts = postRepository.findAll(pageable);

        List<PostDto> content = posts.getContent().stream().map(this::mapToDto).collect(Collectors.toList());

        PostResponse postResponse = new PostResponse();
        postResponse.setContent(content);
        postResponse.setPageNo(posts.getNumber());
        postResponse.setPageSize(posts.getSize());
        postResponse.setTotalElements(posts.getTotalElements());
        postResponse.setTotalPages(posts.getTotalPages());
        postResponse.setLast(posts.isLast());

        return postResponse;
    }

    @Override
    public PostDto getPostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        return mapToDto(post);
    }

    @Override
    public PostDto updatePost(PostDto postDto, Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        Category category = categoryRepository.findById(postDto.getCategoryId())
                .orElseThrow(() -> new ResourceNotFoundException("Category", "id", postDto.getCategoryId()));

        post.setTitle(postDto.getTitle());
        post.setContent(postDto.getContent());
        post.setAuthor(postDto.getAuthor());
        post.setCategory(category);

        Post updatedPost = postRepository.save(post);
        return mapToDto(updatedPost);
    }

    @Override
    public void deletePostById(Long id) {
        Post post = postRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Post", "id", id));
        postRepository.delete(post);
    }

    @Override
    public List<PostDto> getPostsByCategory(Long categoryId) {
        List<Post> posts = postRepository.findByCategoryId(categoryId);
        return posts.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<PostDto> getPostsByAuthor(String author) {
        List<Post> posts = postRepository.findByAuthor(author);
        return posts.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    private PostDto mapToDto(Post post) {
        PostDto postDto = new PostDto();
        postDto.setId(post.getId());
        postDto.setTitle(post.getTitle());
        postDto.setContent(post.getContent());
        postDto.setAuthor(post.getAuthor());
        if(post.getCategory() != null) {
            postDto.setCategoryId(post.getCategory().getId());
        }
        return postDto;
    }
}
"""

files[f"{java_dir}/service/CommentService.java"] = """
package com.blog.api.service;

import com.blog.api.model.dto.CommentDto;
import java.util.List;

public interface CommentService {
    CommentDto createComment(Long postId, CommentDto commentDto);
    List<CommentDto> getCommentsByPostId(Long postId);
    List<CommentDto> getAllComments();
    void deleteComment(Long commentId);
}
"""

files[f"{java_dir}/service/impl/CommentServiceImpl.java"] = """
package com.blog.api.service.impl;

import com.blog.api.exception.ResourceNotFoundException;
import com.blog.api.model.dto.CommentDto;
import com.blog.api.model.entity.Comment;
import com.blog.api.model.entity.Post;
import com.blog.api.repository.CommentRepository;
import com.blog.api.repository.PostRepository;
import com.blog.api.service.CommentService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    @Override
    public CommentDto createComment(Long postId, CommentDto commentDto) {
        Post post = postRepository.findById(postId).orElseThrow(
                () -> new ResourceNotFoundException("Post", "id", postId));

        Comment comment = new Comment();
        comment.setName(commentDto.getName());
        comment.setEmail(commentDto.getEmail());
        comment.setBody(commentDto.getBody());
        comment.setPost(post);

        Comment savedComment = commentRepository.save(comment);
        return mapToDto(savedComment);
    }

    @Override
    public List<CommentDto> getCommentsByPostId(Long postId) {
        List<Comment> comments = commentRepository.findByPostId(postId);
        return comments.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public List<CommentDto> getAllComments() {
        List<Comment> comments = commentRepository.findAll();
        return comments.stream().map(this::mapToDto).collect(Collectors.toList());
    }

    @Override
    public void deleteComment(Long commentId) {
        Comment comment = commentRepository.findById(commentId).orElseThrow(
                () -> new ResourceNotFoundException("Comment", "id", commentId));
        commentRepository.delete(comment);
    }

    private CommentDto mapToDto(Comment comment) {
        CommentDto dto = new CommentDto();
        dto.setId(comment.getId());
        dto.setName(comment.getName());
        dto.setEmail(comment.getEmail());
        dto.setBody(comment.getBody());
        dto.setPostId(comment.getPost().getId());
        return dto;
    }
}
"""

files[f"{java_dir}/controller/CategoryController.java"] = """
package com.blog.api.controller;

import com.blog.api.model.dto.CategoryDto;
import com.blog.api.service.CategoryService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing Categories.
 */
@RestController
@RequestMapping("/api/categories")
@Tag(name = "Category Resource REST API")
public class CategoryController {

    private final CategoryService categoryService;

    public CategoryController(CategoryService categoryService) {
        this.categoryService = categoryService;
    }

    @PostMapping
    public ResponseEntity<CategoryDto> addCategory(@Valid @RequestBody CategoryDto categoryDto) {
        CategoryDto savedCategory = categoryService.addCategory(categoryDto);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<List<CategoryDto>> getCategories() {
        return ResponseEntity.ok(categoryService.getAllCategories());
    }
}
"""

files[f"{java_dir}/controller/PostController.java"] = """
package com.blog.api.controller;

import com.blog.api.model.dto.PostDto;
import com.blog.api.model.dto.PostResponse;
import com.blog.api.service.PostService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing Blog Posts.
 */
@RestController
@RequestMapping("/api/posts")
@Tag(name = "Post Resource REST API")
public class PostController {

    private final PostService postService;

    public PostController(PostService postService) {
        this.postService = postService;
    }

    @PostMapping
    public ResponseEntity<PostDto> createPost(@Valid @RequestBody PostDto postDto) {
        return new ResponseEntity<>(postService.createPost(postDto), HttpStatus.CREATED);
    }

    @GetMapping
    public ResponseEntity<PostResponse> getAllPosts(
            @RequestParam(value = "pageNo", defaultValue = "0", required = false) int pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10", required = false) int pageSize,
            @RequestParam(value = "sortBy", defaultValue = "id", required = false) String sortBy,
            @RequestParam(value = "sortDir", defaultValue = "asc", required = false) String sortDir) {
        return ResponseEntity.ok(postService.getAllPosts(pageNo, pageSize, sortBy, sortDir));
    }

    @GetMapping("/{id}")
    public ResponseEntity<PostDto> getPostById(@PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(postService.getPostById(id));
    }

    @PutMapping("/{id}")
    public ResponseEntity<PostDto> updatePost(@Valid @RequestBody PostDto postDto, @PathVariable(name = "id") Long id) {
        return ResponseEntity.ok(postService.updatePost(postDto, id));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deletePost(@PathVariable(name = "id") Long id) {
        postService.deletePostById(id);
        return ResponseEntity.ok("Post entity deleted successfully.");
    }

    @GetMapping("/category/{id}")
    public ResponseEntity<List<PostDto>> getPostsByCategory(@PathVariable("id") Long categoryId) {
        return ResponseEntity.ok(postService.getPostsByCategory(categoryId));
    }
    
    @GetMapping("/author/{author}")
    public ResponseEntity<List<PostDto>> getPostsByAuthor(@PathVariable("author") String author) {
        return ResponseEntity.ok(postService.getPostsByAuthor(author));
    }
}
"""

files[f"{java_dir}/controller/CommentController.java"] = """
package com.blog.api.controller;

import com.blog.api.model.dto.CommentDto;
import com.blog.api.service.CommentService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller for managing Comments on Posts.
 */
@RestController
@RequestMapping("/api/comments")
@Tag(name = "Comment Resource REST API")
public class CommentController {

    private final CommentService commentService;

    public CommentController(CommentService commentService) {
        this.commentService = commentService;
    }

    @GetMapping
    public List<CommentDto> getAllComments() {
        return commentService.getAllComments();
    }
    
    @PostMapping
    public ResponseEntity<CommentDto> createCommentDirectly(@Valid @RequestBody CommentDto commentDto) {
        return new ResponseEntity<>(commentService.createComment(commentDto.getPostId(), commentDto), HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteComment(@PathVariable(value = "id") Long commentId) {
        commentService.deleteComment(commentId);
        return ResponseEntity.ok("Comment deleted successfully");
    }
}
"""

files[f"{java_dir}/config/SwaggerConfig.java"] = """
package com.blog.api.config;

import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

/**
 * Configuration for Swagger UI and OpenAPI documentation.
 */
@Configuration
public class SwaggerConfig {
    
    @Bean
    public OpenAPI blogApiOpenAPI() {
        return new OpenAPI()
                .info(new Info().title("Blog Management REST API")
                .description("Spring Boot Blog REST API Documentation with CRUD functionalities.")
                .version("v1.0.0")
                .license(new License().name("Apache 2.0").url("http://springdoc.org")))
                .externalDocs(new ExternalDocumentation()
                .description("Blog API Wiki Documentation")
                .url("https://github.com/blog-api-docs"));
    }
}
"""

files[f"{test_dir}/BlogApiApplicationTests.java"] = """
package com.blog.api;

import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
class BlogApiApplicationTests {

    @Test
    void contextLoads() {
        // Ensures the Spring application context starts successfully
    }
}
"""

files[f"{base_dir}/README.md"] = """
# Blog Management REST API

This is a complete Blog Management REST API built using Spring Boot 3.x, Spring Data JPA, Hibernate, and Java 17.

## Technologies Used
- Java 17
- Spring Boot 3.x
- Spring Web (REST API)
- Spring Data JPA & Hibernate
- Validation API (Hibernate Validator)
- Lombok
- H2 In-Memory Database (Switchable to PostgreSQL)
- Maven
- Swagger / OpenAPI (Springdoc)
- SLF4J and Logback (Built-in with Spring Boot)

## Features Included
- **CRUD Operations**: Posts, Categories, Comments.
- **Filtering**: Posts by Category and Author.
- **Pagination & Sorting**: Post endpoints support dynamic pagination and sorting.
- **Global Exception Handling**: Returns standardized JSON error responses via `@ControllerAdvice`.
- **Validation**: Request DTO validation (`@Valid`, `@NotEmpty`, etc).
- **Auto Data Initialization**: Pre-populated test data using `data.sql`.
- **API Documentation**: Automated Swagger UI at `/swagger-ui/index.html`.

## Project Structure Mapping
```
src/main/java/com/blog/api/
│── controller/   -> REST Controllers mapping endpoints
│── service/      -> Interfaces and implementations containing business logic
│── repository/   -> Spring Data JPA Repositories
│── model/        
│   ├── entity/   -> JPA Entities representing database tables
│   └── dto/      -> Data Transfer Objects for client-server communication
│── exception/    -> Global error handler and custom exceptions
│── config/       -> Swagger configuration
```

## How to Run

1. Clone or download the source code.
2. Open terminal in the `week6-spring-blog-api` directory.
3. Run `mvn spring-boot:run` or just run `BlogApiApplication.java` in your IDE.
4. Access Swagger UI: [http://localhost:8080/swagger-ui/index.html](http://localhost:8080/swagger-ui/index.html)
5. Access H2 Console: [http://localhost:8080/h2-console](http://localhost:8080/h2-console)
   - JDBC URL: `jdbc:h2:mem:blogdb`
   - User: `sa`
   - Password: `password`

## Documentation & Testing
Sample responses and a Postman collection are included in the `docs` folder.
"""

files[f"{docs_dir}/SampleResponses.md"] = """
# Sample API Responses

### GET `/api/posts` (Paginated)
```json
{
  "content": [
    {
      "id": 1,
      "title": "Spring Boot 3 Intro",
      "content": "Introduction to Spring Boot 3 and Java 17",
      "author": "John Doe",
      "categoryId": 1
    },
    ...
  ],
  "pageNo": 0,
  "pageSize": 10,
  "totalElements": 2,
  "totalPages": 1,
  "last": true
}
```

### POST `/api/posts` (Validation Error)
Request Body:
```json
{
    "title": "A",
    "content": "Short",
    "author": "",
    "categoryId": 1
}
```
Response (`400 Bad Request`):
```json
{
  "author": "Author should not be empty",
  "title": "Post title should have at least 2 characters",
  "content": "Post content should have at least 10 characters"
}
```

### POST `/api/comments`
Request Body:
```json
{
  "name": "Bob",
  "email": "bob@example.com",
  "body": "This is a helpful comment over 10 chars.",
  "postId": 1
}
```
Response (`201 Created`):
```json
{
  "id": 2,
  "name": "Bob",
  "email": "bob@example.com",
  "body": "This is a helpful comment over 10 chars.",
  "postId": 1
}
```
"""

files[f"{docs_dir}/PostmanCollection.json"] = """
{
  "info": {
    "name": "Blog Management API",
    "schema": "https://schema.getpostman.com/json/collection/v2.1.0/collection.json"
  },
  "item": [
    {
      "name": "Get All Posts",
      "request": {
        "method": "GET",
        "url": {
          "raw": "http://localhost:8080/api/posts?pageNo=0&pageSize=5",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "8080",
          "path": [
            "api",
            "posts"
          ],
          "query": [
            {
              "key": "pageNo",
              "value": "0"
            },
            {
              "key": "pageSize",
              "value": "5"
            }
          ]
        }
      }
    },
    {
      "name": "Create Post",
      "request": {
        "method": "POST",
        "header": [
          {
            "key": "Content-Type",
            "value": "application/json"
          }
        ],
        "body": {
          "mode": "raw",
          "raw": "{\\n    \\"title\\": \\"New API Design\\",\\n    \\"content\\": \\"This is a detailed post about API design...\\",\\n    \\"author\\": \\"Alice\\",\\n    \\"categoryId\\": 1\\n}"
        },
        "url": {
          "raw": "http://localhost:8080/api/posts",
          "protocol": "http",
          "host": [
            "localhost"
          ],
          "port": "8080",
          "path": [
            "api",
            "posts"
          ]
        }
      }
    }
  ]
}
"""

for filepath, content in files.items():
    write_file(filepath, content)

print("Spring Boot project 'week6-spring-blog-api' generated successfully!")
