package com.firas.server.controller;

import com.firas.server.model.Articles;
import com.firas.server.repository.ArticleRepository;
import com.firas.server.service.ArticleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/api/articles")
@CrossOrigin
public class ArticleController {

    @Autowired
    ArticleRepository articleRepository;

    private final ArticleService articleService;

    public ArticleController(ArticleService articleService) {
        this.articleService = articleService;
    }

    @PostMapping
    public Articles createArticle(@RequestParam("title") String title,
                                  @RequestParam("description") String description,
                                  @RequestParam("content") String content,
                                  @RequestParam(value = "image", required = false) MultipartFile image,
                                  @RequestParam("username") String username,
                                  @RequestParam(value = "referenceLink", required = false) String referenceLink) throws IOException {
        String imagePath = null;

        if (image != null && !image.isEmpty()) {
            String uploadDir = "uploads/";
            File uploadFolder = new File(uploadDir);
            if (!uploadFolder.exists()) uploadFolder.mkdirs();

            imagePath = uploadDir + image.getOriginalFilename();
            image.transferTo(new File(imagePath));
        }

        Articles article = new Articles();
        article.setTitle(title);
        article.setDescription(description);
        article.setContent(content);
        article.setImagePath(imagePath);
        article.setUsername(username);
        article.setReferenceLink(referenceLink);

        return articleService.saveArticle(article);
    }

    // Delete an appointment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<String> deleteArticle(@PathVariable String id) {
        if (articleRepository.existsById(id)) {
            articleRepository.deleteById(id);
            return ResponseEntity.ok("Article deleted successfully.");
        } else {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Article not found.");
        }
    }

    @GetMapping
    public ResponseEntity<List<Articles>> getArticlesByUsername(@RequestParam String username) {
        List<Articles> articles = articleRepository.findByUsername(username);
        return ResponseEntity.ok(articles);
    }
    @GetMapping("/allArticles")
    public ResponseEntity<List<Articles>> getAllArticles() {
        List<Articles> articles = articleRepository.findAll();
        return ResponseEntity.ok(articles);
    }
}
