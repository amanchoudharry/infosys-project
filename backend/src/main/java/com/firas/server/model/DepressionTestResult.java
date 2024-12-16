package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "depression_test_results")
public class DepressionTestResult {

    @Id
    private String id;
    private String userId;
    private String username;
    private double averageScore;
    private String status;
    private String depressionCategory;
    private List<String> recommendedResources;

}
