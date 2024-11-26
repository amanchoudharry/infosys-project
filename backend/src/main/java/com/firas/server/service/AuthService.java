package com.firas.server.service;

import com.firas.server.model.AuthRequest;
import com.firas.server.model.AuthResponse;
import com.firas.server.model.User;
import com.firas.server.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import jakarta.servlet.http.HttpSession;
import java.util.Optional;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private BCryptPasswordEncoder passwordEncoder;

    public String register(User user) {
        if (userRepository.findByUsername(user.getUsername()).isPresent()) {
            throw new RuntimeException("User already exists");
        }
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        userRepository.save(user);
        return "User registered successfully";
    }

    public AuthResponse login(AuthRequest authRequest, HttpSession session) {
        Optional<User> userOptional = userRepository.findByUsername(authRequest.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            if (passwordEncoder.matches(authRequest.getPassword(), user.getPassword())) {
                session.setAttribute("username", user.getUsername());
                session.setAttribute("role", user.getRole());
                return new AuthResponse("Login successful", session.getId());
            }
        }
        throw new RuntimeException("Invalid credentials");
    }
}

