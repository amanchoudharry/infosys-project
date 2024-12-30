package com.firas.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.core.session.SessionRegistry;
import org.springframework.security.core.session.SessionRegistryImpl;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.session.HttpSessionEventPublisher;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register", "/api/login","/api/users/register","/api/users/search","/api/users/user/{username}","/api/users/change-password","/api/contacts","/api/newsletter","/api/appointments","/api/appointments/{id}","/api/appointments/{userId}","/api/contacts/{id}","/api/send-sos","/api/anxiety-test","/api/depression-test","/api/disorder-test","/api/services","/api/services/{type}","/api/services/{userId}","/api/articles","/api/articles/{id}","/api/articles/allArticles","/api/bookmarks","/api/services/{id}/accept","/api/services/{userId}","/api/users/{id}","/api/users/{userId}/upload-image","/api/services/{id}","/api/postpartum-test","/api/adhd-test","/api/bipolar-test","/api/depression-test/category/**","/api/anxiety-test/category/**","/api/adhd-test").permitAll() // Public endpoints
                        .requestMatchers("/api/admin/**").hasAuthority("admin") // Admin-only endpoints
                        .requestMatchers("/api/professional/**").hasAuthority("professional") // Professional-only endpoints
                        .requestMatchers("/api/user/**").hasAuthority("user") // User-only endpoints
                        .requestMatchers("/api/user/details").authenticated() // Authenticate other requests
                )
                .logout(logout -> logout.permitAll()); // Allow logout for all users

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for password hashing
    }

    @Bean
    public SessionRegistry sessionRegistry() {
        return new SessionRegistryImpl();
    }

    @Bean
    public HttpSessionEventPublisher httpSessionEventPublisher() {
        return new HttpSessionEventPublisher();
    }
}
