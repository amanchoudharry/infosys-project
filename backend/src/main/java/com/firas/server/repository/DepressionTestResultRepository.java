package com.firas.server.repository;

import com.firas.server.model.DepressionTestResult;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface DepressionTestResultRepository extends MongoRepository<DepressionTestResult, String> {
}
