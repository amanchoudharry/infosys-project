package com.firas.server.service;

import com.firas.server.model.Articles;
import com.firas.server.repository.ArticleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ArticleService {
    private final ArticleRepository repository;

    public ArticleService(ArticleRepository repository) {
        this.repository = repository;
    }

    public Articles saveArticle(Articles article) {
        return repository.save(article);
    }

    public List<Articles> getAllArticles() {
        return repository.findAll();
    }
}
