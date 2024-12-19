package com.firas.server.DTO;

import lombok.Data;

@Data
public class ServiceRequestDto {
    private String name;
    private String email;
    private String phone;
    private String message;
    private String userId; // Include userId sent from frontend    // Getters and setters
}
