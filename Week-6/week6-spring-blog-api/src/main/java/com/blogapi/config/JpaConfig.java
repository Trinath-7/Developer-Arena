// Defines the package for configuration classes
package com.blogapi.config;

// Imports the Configuration annotation to mark this class as a source of bean definitions
import org.springframework.context.annotation.Configuration;
// Imports EnableJpaAuditing to activate JPA entity auditing (like @CreatedDate and @LastModifiedDate)
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

// Indicates that this class provides Spring Boot configuration bean declarations
@Configuration
// Activates automatic tracking of creation and modification dates on database entities
@EnableJpaAuditing
public class JpaConfig {
    // This is an empty configuration class whose sole purpose is to boot the JPA Auditing subsystem.
    // Keeping it separate from BlogApiApplication prevents @WebMvcTest from trying to load full database context.
}
