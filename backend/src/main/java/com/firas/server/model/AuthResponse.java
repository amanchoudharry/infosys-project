package com.firas.server.model;

import lombok.Data;

@Data
public class AuthResponse {
    private String message;
    private String sessionId;

    public AuthResponse(String message, String sessionId) {
        this.message = message;
        this.sessionId = sessionId;
    }

}