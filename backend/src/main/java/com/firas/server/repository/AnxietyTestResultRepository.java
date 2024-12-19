package com.firas.server.repository;

import com.firas.server.model.AnxietyTestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.Optional;

public interface AnxietyTestResultRepository extends MongoRepository<AnxietyTestResult, String> {
    @Query(value = "{ 'userId': ?0 }", fields = "{ 'anxietyCategory': 1, '_id': 0 }")
    Optional<String> findAnxietyCategoryByUserId(String userId);
}
