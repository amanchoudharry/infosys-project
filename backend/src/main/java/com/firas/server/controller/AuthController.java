package com.firas.server.controller;

import com.firas.server.model.AuthRequest;
import com.firas.server.model.AuthResponse;
import com.firas.server.model.User;
import com.firas.server.service.AuthService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import jakarta.servlet.http.HttpSession;
import jakarta.validation.Valid;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin
public class AuthController {

    @Autowired
    private AuthService authService;
    @CrossOrigin
    @PostMapping("/register")
    public String register(@Valid @RequestBody User user) {
        return authService.register(user);
    }

    @PostMapping("/login")
    public AuthResponse login(@Valid @RequestBody AuthRequest authRequest, HttpSession session) {
        return authService.login(authRequest, session);
    }
}
