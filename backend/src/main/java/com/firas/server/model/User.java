package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "users")
public class User {
    @Id
    private String id;
    private String username;
    private String password;
    private String role;
    private int age;
    private String dob;
    private String gender;
    private String email;
    private String summary;
    private String name;
    private String profileImage;
}
