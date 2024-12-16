package com.firas.server.repository;

import com.firas.server.model.DepressionTestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface DepressionTestResultRepository extends MongoRepository<DepressionTestResult, String> {
    @Query(value = "{ 'userId': ?0 }", fields = "{ 'depressionCategory': 1, '_id': 0 }")
    Optional<String> findDepressionCategoryByUserId(String userId);
}
