package com.firas.server.service;

import com.firas.server.config.TwilioConfig;
import com.firas.server.model.ServiceRequest;
import com.firas.server.repository.ServiceRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class SessionService {
    @Autowired
    private ServiceRepository sessionRepository;
    @Autowired
    private EmailService emailService;
    @Autowired
    private TwilioConfig twilioConfig;

    @Value("${twilio.fromPhoneNumber}")
    private String fromPhoneNumber;

    public SessionService(TwilioConfig twilioConfig) {
        // Initialize Twilio with the credentials from TwilioConfig
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

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

            // Send a confirmation email to the user
            String subject = "Session service Confirmation";
            String body = "Greetings!\n\nDear " + service.getName() +
                    ", Your session with " + professionalName + " has been successfully accepted.\n" +
                    "Thank you,\nTeam Mental Health";
            emailService.sendEmail(service.getEmail(), subject, body);

            Message message = Message.creator(
                    new PhoneNumber(service.getPhone()),  // Send SMS to contact's phone
                    new PhoneNumber(fromPhoneNumber),     // Twilio phone number
                    body
            ).create();

            return true;
        }
        return false;
    }
}
