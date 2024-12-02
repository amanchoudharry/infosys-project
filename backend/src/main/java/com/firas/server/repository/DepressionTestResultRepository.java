package com.firas.server.repository;

import com.firas.server.model.DepressionTestResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DepressionTestResultRepository extends MongoRepository<DepressionTestResult, String> {
}
