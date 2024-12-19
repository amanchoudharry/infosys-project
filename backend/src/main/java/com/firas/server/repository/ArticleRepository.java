package com.firas.server.repository;

import com.firas.server.model.Articles;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface ArticleRepository extends MongoRepository<Articles, String> {
    List<Articles> findByUsername(String username);
}
