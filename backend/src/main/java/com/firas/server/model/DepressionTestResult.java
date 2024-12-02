package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "depression_test_results")
public class DepressionTestResult {
    @Id
    private String id;
    private double averageScore;
    private String status;
}
