package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "appointments")
public class Appointment {
    @Id
    private String id;
    private String name;
    private String email;
    private String date;
    private String time;
    private String message;
    private String status = "Pending";
    private String acceptedByProfessionalName; // Store professional username
    private String userId;
    private String phone;
}
