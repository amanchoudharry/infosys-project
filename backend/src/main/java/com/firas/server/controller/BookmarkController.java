package com.firas.server.controller;

import com.firas.server.model.Bookmark;
import com.firas.server.repository.BookmarkRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/bookmarks")
public class BookmarkController {

    @Autowired
    private BookmarkRepository bookmarkRepository;

    @PostMapping
    public ResponseEntity<?> toggleBookmark(@RequestBody Bookmark bookmark) {
        Optional<Bookmark> existingBookmark = bookmarkRepository.findByUserIdAndTitle(bookmark.getUserId(), bookmark.getTitle());
        if (existingBookmark.isPresent()) {
            bookmarkRepository.deleteByUserIdAndTitle(bookmark.getUserId(), bookmark.getTitle());
            return ResponseEntity.ok("Bookmark removed");
        } else {
            bookmarkRepository.save(bookmark);
            return ResponseEntity.ok("Bookmark added");
        }
    }
    @GetMapping
    public List<Bookmark> getBookmarks(@RequestParam String userId) {
        return bookmarkRepository.findByUserId(userId);
    }
}
