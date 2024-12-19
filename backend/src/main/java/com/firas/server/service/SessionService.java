package com.firas.server.service;

import com.firas.server.model.ServiceRequest;
import com.firas.server.repository.ServiceRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {
    @Autowired
    private ServiceRepository sessionRepository;

    public List<ServiceRequest> getAllSessions() {
        return sessionRepository.findAll();
    }
    public void deleteSessionById(String id) {
        sessionRepository.deleteById(id);
    }
    public ServiceRequest saveRequest(ServiceRequest request) {
        return sessionRepository.save(request);
    }
    // Accept an appointment by setting the professional name and status
    public boolean acceptAppointment(String id, String professionalName) {
        Optional<ServiceRequest> optionalService = sessionRepository.findById(id);
        if (optionalService.isPresent()) {
            ServiceRequest service = optionalService.get();
            service.setStatus("Accepted");
            service.setProfessionalName(professionalName);
            sessionRepository.save(service);
            return true;
        }
        return false;
    }
}
