package com.firas.server.model;

import lombok.Data;

@Data
public class AuthRequest {
    private String username;
    private String password;

    // Getters and setters
}