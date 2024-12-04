package com.firas.server.DTO;

import lombok.Data;

@Data
public class AssessmentRequest {
    private String username;
    private double averageScore;
    private String status;

}
