package com.firas.server.repository;

import com.firas.server.model.BipolarTest;
import org.springframework.data.mongodb.repository.MongoRepository;

public interface BipolarTestRepository extends MongoRepository<BipolarTest, String> {
}
