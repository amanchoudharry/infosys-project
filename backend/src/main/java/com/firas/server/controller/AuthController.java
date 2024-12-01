package com.firas.server.controller;

import com.firas.server.model.User;
import com.firas.server.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class AuthController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        String response = userService.registerUser(user);
        if ("User already exists!".equals(response)) {
            return ResponseEntity.badRequest().body(response);
        }
        return ResponseEntity.status(201).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody User loginRequest) {
        User user = userService.authenticateUser(loginRequest.getUsername(), loginRequest.getPassword());
        if (user != null) {
            Map<String, String> response = new HashMap<>();
            response.put("message", "Login successful!");
            response.put("role", user.getRole());
            return ResponseEntity.ok(response);
        }
        return ResponseEntity.status(401).body("Invalid credentials!");
    }

    // Admin Dashboard
    @GetMapping("/admin/dashboard")
    public ResponseEntity<?> adminDashboard() {
        return ResponseEntity.ok("Welcome to the Admin Dashboard!");
    }

    // Professional Dashboard
    @GetMapping("/professional/dashboard")
    public ResponseEntity<?> professionalDashboard() {
        return ResponseEntity.ok("Welcome to the Professional Dashboard!");
    }
    // User Dashboard
    @GetMapping("/user/dashboard")
    public ResponseEntity<?> userDashboard() {
        return ResponseEntity.ok("Welcome to the User Dashboard!");
    }
}