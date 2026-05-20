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
