package com.firas.server.repository;

import com.firas.server.model.EmergencyContact;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmergencyContactRepository extends MongoRepository<EmergencyContact, String> {
}

