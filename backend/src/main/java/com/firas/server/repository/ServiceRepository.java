package com.firas.server.repository;

import com.firas.server.model.ServiceRequest;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ServiceRepository extends MongoRepository<ServiceRequest, String> {
    List<ServiceRequest> findByUserId(String userId);
}
