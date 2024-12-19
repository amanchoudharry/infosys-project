package com.firas.server.DTO;

import lombok.Data;

@Data
public class SOSRequest {
    private double latitude;
    private double longitude;
    private String username;
    private String userId;
}
