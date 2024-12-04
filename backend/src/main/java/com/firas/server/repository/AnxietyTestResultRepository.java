package com.firas.server.repository;

import com.firas.server.model.AnxietyTestResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface AnxietyTestResultRepository extends MongoRepository<AnxietyTestResult, String> {
}
