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

    @GetMapping
    public ResponseEntity<List<EmergencyContact>> getAllContacts() {
        return ResponseEntity.ok(service.getAllContacts());
    }

    @PostMapping
    public ResponseEntity<EmergencyContact> createContact(@Valid @RequestBody EmergencyContact contact) {
        EmergencyContact createdContact = service.createContact(contact);
        return ResponseEntity.ok(createdContact);
    }

    @PutMapping("/{id}")
    public ResponseEntity<EmergencyContact> updateContact(@PathVariable String id,
                                                          @Valid @RequestBody EmergencyContact contact) {
        return service.updateContact(id, contact)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteContact(@PathVariable String id) {
        service.deleteContact(id);
        return ResponseEntity.noContent().build();
    }
}
