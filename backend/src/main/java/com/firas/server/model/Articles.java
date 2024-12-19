package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "articles")
public class Articles {
    @Id
    private String id;
    private String title;
    private String description;
    private String content;
    private String imagePath; // for storing image path if needed
    private String username;  // professional username
    private String referenceLink;

}
