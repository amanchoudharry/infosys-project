package com.firas.server.controller;

import com.firas.server.config.TwilioConfig;
import com.firas.server.model.ServiceRequest;
import com.firas.server.repository.ServiceRepository;
import com.firas.server.service.EmailService;
import com.firas.server.service.SessionService;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/services")
public class ServiceController {

    @Autowired
    private SessionService sessionService;

    @Autowired
    private ServiceRepository serviceRepository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private TwilioConfig twilioConfig;

    @Value("${twilio.fromPhoneNumber}")
    private String fromPhoneNumber;

    public ServiceController(TwilioConfig twilioConfig) {
        // Initialize Twilio with the credentials from TwilioConfig
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    @PostMapping("/{type}")
    public ResponseEntity<?> handleServiceRequest(@PathVariable String type, @RequestBody ServiceRequest request) {
        request.setServiceType(type);
        serviceRepository.save(request);

        // Send a confirmation email to the user
        String subject = "Professional Service Request Received";
        String body = "Dear " + request.getName() + ",\n\n" +
                "We have received your service request for "+request.getServiceType()+" successfully. \nYou will receive another response once a professional has been assigned to your service.\n\n" +
                "Thank you,\nTeam Mental Health";
        emailService.sendEmail(request.getEmail(), subject, body);

        Message message = Message.creator(
                new PhoneNumber(request.getPhone()),  // Send SMS to contact's phone
                new PhoneNumber(fromPhoneNumber),     // Twilio phone number
                body
        ).create();

        return ResponseEntity.status(HttpStatus.CREATED).body("Request submitted successfully");
    }
    // Fetch all sessions
    @GetMapping
    public ResponseEntity<List<ServiceRequest>> getAllSessions() {
        return ResponseEntity.ok(sessionService.getAllSessions());
    }

    @GetMapping("/{userId}")
    public List<ServiceRequest> getSessionRequestsByUserId(@PathVariable String userId) {
        return serviceRepository.findByUserId(userId);
    }

    // Accept an appointment
    @PutMapping("/{id}/accept")
    public ResponseEntity<?> acceptAppointment(@PathVariable String id, @RequestBody ServiceRequest acceptRequest) {
        boolean updated = sessionService.acceptAppointment(id, acceptRequest.getProfessionalName());
        if (updated) {
            return ResponseEntity.ok("Appointment accepted successfully!");
        } else {
            return ResponseEntity.badRequest().body("Failed to accept the appointment. Service ID may not exist.");
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteSession(@PathVariable String id) {
        sessionService.deleteSessionById(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

}
