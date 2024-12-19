package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "serviceRequests")
public class ServiceRequest {
    @Id
    private String id;
    private String serviceType;
    private String name;
    private String email;
    private String phone;
    private String message;
    private String status = "Pending";
    private String professionalName;
    private String userId; // Field to store userId
}

