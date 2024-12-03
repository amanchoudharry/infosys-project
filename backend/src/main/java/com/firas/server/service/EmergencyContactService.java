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

    public List<EmergencyContact> getAllContacts() {
        return repository.findAll();
    }

    public EmergencyContact createContact(EmergencyContact contact) {
        return repository.save(contact);
    }

    public Optional<EmergencyContact> updateContact(String id, EmergencyContact updatedContact) {
        return repository.findById(id).map(contact -> {
            contact.setName(updatedContact.getName());
            contact.setPhone(updatedContact.getPhone());
            contact.setRelationship(updatedContact.getRelationship());
            return repository.save(contact);
        });
    }

    public void deleteContact(String id) {
        repository.deleteById(id);
    }
}
