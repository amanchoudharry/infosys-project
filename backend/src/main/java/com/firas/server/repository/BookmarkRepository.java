package com.firas.server.repository;

import com.firas.server.model.Bookmark;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface BookmarkRepository extends MongoRepository<Bookmark, String> {
    Optional<Bookmark> findByUserIdAndTitle(String userId, String title);
    void deleteByUserIdAndTitle(String userId, String title);
    List<Bookmark> findByUserId(String userId);
}
