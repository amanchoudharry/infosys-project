package com.firas.server.repository;

import com.firas.server.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface EmergencyContactRepository extends MongoRepository<EmergencyContact, String> {

    // Method to find contacts by userId
    List<EmergencyContact> findByUserId(String userId);
}
