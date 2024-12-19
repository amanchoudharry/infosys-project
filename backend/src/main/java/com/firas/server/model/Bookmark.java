package com.firas.server.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "bookmarks")
public class Bookmark {
    @Id
    private String id;
    private String userId;
    private String img;
    private String title;
    private String desc;
    private String link;

}
