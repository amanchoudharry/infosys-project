package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;

@Data
@Document(collection = "anxiety_test_results")
public class AnxietyTestResult {
    @Id
    private String id;
    private String userId;
    private String username;
    private double averageScore;
    private String status;
    private String anxietyCategory;
    private List<String> recommendedResources;
}
