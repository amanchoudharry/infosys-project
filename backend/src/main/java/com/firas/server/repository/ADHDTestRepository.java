package com.firas.server.repository;

import com.firas.server.model.ADHDTest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface ADHDTestRepository extends MongoRepository<ADHDTest, String> {
}
