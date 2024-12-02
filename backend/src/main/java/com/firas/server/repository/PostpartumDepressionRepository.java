package com.firas.server.repository;

import com.firas.server.model.PostpartumDepressionResult;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface PostpartumDepressionRepository extends MongoRepository<PostpartumDepressionResult, String> {
}
