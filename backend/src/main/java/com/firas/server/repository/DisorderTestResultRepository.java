package com.firas.server.repository;

import com.firas.server.model.DisorderTestResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface DisorderTestResultRepository extends MongoRepository<DisorderTestResult, String> {
}
