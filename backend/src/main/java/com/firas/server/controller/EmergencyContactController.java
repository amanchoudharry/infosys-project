package com.firas.server.controller;

import com.firas.server.model.EmergencyContact;
import com.firas.server.service.EmergencyContactService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contacts")
@CrossOrigin
public class EmergencyContactController {

    @Autowired
    private EmergencyContactService service;

    // Fetch all emergency contacts for a specific user by userId
    @GetMapping("/{userId}")
    public ResponseEntity<List<EmergencyContact>> getAllContactsByUserId(@PathVariable String userId) {
        List<EmergencyContact> contacts = service.getAllContactsByUserId(userId);
        if (contacts.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(contacts);
    }

    // Create a new emergency contact for a specific user
    @PostMapping
    public ResponseEntity<EmergencyContact> createContact(@Valid @RequestBody EmergencyContact contact) {
        EmergencyContact createdContact = service.createContact(contact);
        return ResponseEntity.status(201).body(createdContact);
    }

    // Update an existing emergency contact
    @PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateContact(@PathVariable String id,
                                                          @Valid @RequestBody EmergencyContact contact) {
        return service.updateContact(id, contact)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    // Delete an emergency contact by its ID
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String id) {
        service.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}
