package com.firas.server.controller;

import com.firas.server.model.ServiceRequest;
import com.firas.server.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private ServiceRepository serviceRepository;

    @PostMapping("/{type}")
    public ResponseEntity<?> handleServiceRequest(@PathVariable String type, @RequestBody ServiceRequest request) {
        request.setServiceType(type);
        serviceRepository.save(request);
        return ResponseEntity.status(HttpStatus.CREATED).body("Request submitted successfully");
    }
}
