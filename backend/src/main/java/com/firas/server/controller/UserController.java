package com.firas.server.controller;

import com.firas.server.model.User;
import com.firas.server.repository.UserRepository;
import lombok.Data;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;
import java.util.Base64;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin
public class UserController {

    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    @Autowired
    private UserRepository userRepository;

    @GetMapping("/{id}")
    public Optional<User> getUser(@PathVariable String id) {
        return userRepository.findById(id);
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody User user) {
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            return ResponseEntity.badRequest().body("User already exists!");
        }

        // Hash the password before saving
        user.setPassword(passwordEncoder.encode(user.getPassword()));

        userRepository.save(user);
        return ResponseEntity.ok("User registered successfully!");
    }

    @PutMapping("/{id}")
    public User updateUser(@PathVariable String id, @RequestBody User updatedUser) {
        return userRepository.findById(id)
                .map(user -> {
                    user.setName(updatedUser.getName());
                    user.setAge(updatedUser.getAge());
                    user.setDob(updatedUser.getDob());
                    user.setGender(updatedUser.getGender());
                    user.setEmail(updatedUser.getEmail());
                    user.setSummary(updatedUser.getSummary());
                    return userRepository.save(user);
                })
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    @PostMapping("/{userId}/upload-image")
    public String uploadProfileImage(@PathVariable String userId, @RequestParam("image") MultipartFile file) {
        try {
            // Convert image to Base64 string
            String base64Image = Base64.getEncoder().encodeToString(file.getBytes());

            // Find user and update profile image
            User user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
            user.setProfileImage(base64Image);
            userRepository.save(user);

            return "Profile image updated successfully.";
        } catch (Exception e) {
            throw new RuntimeException("Failed to upload image: " + e.getMessage());
        }
    }
    @GetMapping("/user/{username}")
    public ResponseEntity<?> findByUsername(@PathVariable String username) {
        Optional<User> user = userRepository.findByUsername(username);
        if (user.isPresent()) {
            return ResponseEntity.ok(user.get());
        } else {
            return ResponseEntity.status(404).body("User not found");
        }
    }
    // Change Password Functionality
    @PutMapping("/change-password")
    public ResponseEntity<?> changePassword(@RequestBody PasswordChangeRequest request) {
        Optional<User> userOptional = userRepository.findByUsername(request.getUsername());
        if (userOptional.isPresent()) {
            User user = userOptional.get();
            user.setPassword(request.getNewPassword());
            userRepository.save(user);
            return ResponseEntity.ok("Password updated successfully!");
        } else {
            return ResponseEntity.status(404).body("User not found.");
        }
    }

    @Data
    public static class PasswordChangeRequest {
        private String username;
        private String newPassword;
    }
}
