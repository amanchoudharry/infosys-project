package com.firas.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {
    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/api/**") // Apply CORS for your API endpoints
                        .allowedOrigins("http://localhost:5173") // Allow your frontend origin
                        .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS") // Allow necessary HTTP methods
                        .allowedHeaders("*") // Allow all headers
                        .exposedHeaders("Authorization") // Expose specific headers if needed
                        .allowCredentials(true); // Allow credentials (if required)
            }
        };
    }
}