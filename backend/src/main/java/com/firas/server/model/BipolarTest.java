package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "bipolar_test_results")
public class BipolarTest {
    @Id
    private String id;
    private double averageScore;
    private String status;
}
