// Defines the package for configuration classes
package com.blogapi.config;

// Import Swagger models for configuring OpenAPI specification details
import io.swagger.v3.oas.models.ExternalDocumentation;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Contact;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.info.License;
// Import spring context annotations for configuration classes and bean management
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

// Marks this class as containing Spring configuration bean definitions
@Configuration
public class SwaggerConfig {
    
    // Declares a Spring bean for OpenAPI configuration which is read by SpringDoc to generate the Swagger UI
    @Bean
    public OpenAPI blogApiOpenAPI() {
        // Return a configured OpenAPI schema instance
        return new OpenAPI()
                // Sets general API metadata documentation
                .info(new Info()
                        // Title shown at the top of the Swagger documentation page
                        .title("Blog Management REST API")
                        // Detailed description explaining what operations this REST service supports
                        .description("A production-ready Spring Boot REST API for managing blog posts, categories, and comments. Supports pagination, sorting, search filters, JPA Auditing, and global exception handling.")
                        // The current release version of the API
                        .version("v1.0.0")
                        // Contact information for API developers
                        .contact(new Contact()
                                .name("Developer Support")
                                .email("support@blogapi.com")
                                .url("https://github.com/developer/blogapi"))
                        // License information for using the API
                        .license(new License()
                                .name("Apache 2.0")
                                .url("https://www.apache.org/licenses/LICENSE-2.0")))
                // Adds links to external developer documentation or code repository wikis
                .externalDocs(new ExternalDocumentation()
                        .description("Blog API Wiki Documentation")
                        .url("https://github.com/developer/blogapi/wiki"));
    }
}
