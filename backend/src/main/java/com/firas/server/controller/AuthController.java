package com.firas.server.controller;

import com.firas.server.model.User;
import com.firas.server.repository.UserRepository;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserRepository userRepository;

    @PostMapping("/register")
    public ResponseEntity<?> register(@RequestBody User user) {
        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully");
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody User credentials, HttpServletResponse response) {
        Optional<User> user = userRepository.findByUsername(credentials.getUsername());
        if (user.isPresent() && user.get().getPassword().equals(credentials.getPassword())) {
            Cookie cookie = new Cookie("userId", user.get().getId());
            cookie.setHttpOnly(true);
            cookie.setPath("/");
            response.addCookie(cookie);

            return ResponseEntity.ok(Map.of(
                    "id", user.get().getId(),
                    "username", user.get().getUsername(),
                    "role", user.get().getRole()
            ));
        }
        return ResponseEntity.status(401).body("Invalid credentials");
    }

    // User Dashboard
    @GetMapping("/user/dashboard")
    public ResponseEntity<?> userDashboard() {
        return ResponseEntity.ok("Welcome to the User Dashboard!");
    }
}
