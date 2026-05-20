// Declares the package matching the folder structure
package com.blogapi;

// Import the SpringApplication class to bootstrap the Spring Boot application
import org.springframework.boot.SpringApplication;
// Import the SpringBootApplication annotation to enable auto-configuration, component scan, and configuration properties
import org.springframework.boot.autoconfigure.SpringBootApplication;

// Marks this class as the main configuration class that launches the application
@SpringBootApplication
public class BlogApiApplication {
    // The main entry point method of the Java application
    public static void main(String[] args) {
        // Starts the Spring application context and runs the embedded web server
        SpringApplication.run(BlogApiApplication.class, args);
    }
}
