package com.firas.server.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http
                .csrf(csrf -> csrf.disable()) // Disable CSRF
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers("/api/register", "/api/login").permitAll() // Public endpoints
                        .requestMatchers("/api/admin/**").hasAuthority("admin") // Admin-only endpoints
                        .requestMatchers("/api/professional/**").hasAuthority("professional") // Professional-only endpoints
                        .requestMatchers("/api/user/**").hasAuthority("user") // User-only endpoints
                        .anyRequest().authenticated() // Authenticate other requests
                )
                .logout(logout -> logout.permitAll()); // Allow logout for all users

        return http.build();
    }

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder(); // Use BCrypt for password hashing
    }
}
