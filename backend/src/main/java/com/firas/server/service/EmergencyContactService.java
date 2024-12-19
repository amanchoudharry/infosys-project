package com.firas.server.service;

import com.firas.server.model.EmergencyContact;
import com.firas.server.repository.EmergencyContactRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EmergencyContactService {

    @Autowired
    private EmergencyContactRepository repository;

    // Fetch all contacts by userId
    public List<EmergencyContact> getAllContactsByUserId(String userId) {
        // Find all emergency contacts where the userId matches
        return repository.findByUserId(userId);
    }

    // Create a new contact for a specific user
    public EmergencyContact createContact(EmergencyContact contact) {
        // Save the contact to the repository and return the saved contact
        return repository.save(contact);
    }

    // Update an existing contact
    public Optional<EmergencyContact> updateContact(String id, EmergencyContact updatedContact) {
        // Find the existing contact by its ID
        return repository.findById(id).map(contact -> {
            // Update the contact's details
            contact.setName(updatedContact.getName());
            contact.setPhone(updatedContact.getPhone());
            contact.setRelationship(updatedContact.getRelationship());
            // Save the updated contact to the repository and return it
            return repository.save(contact);
        });
    }

    // Delete a contact by its ID
    public void deleteContact(String id) {
        // Delete the contact from the repository by its ID
        repository.deleteById(id);
    }
}
