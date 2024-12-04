package com.firas.server.controller;

import com.firas.server.DTO.SOSRequest;
import com.firas.server.config.TwilioConfig;
import com.firas.server.model.EmergencyContact;
import com.firas.server.service.EmergencyContactService;
import com.twilio.Twilio;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Value;

import java.util.List;

@RestController
@RequestMapping("/api")
@CrossOrigin
public class SOSController {

    @Autowired
    private EmergencyContactService emergencyContactService;

    @Autowired
    private TwilioConfig twilioConfig;

    @Value("${twilio.fromPhoneNumber}")
    private String fromPhoneNumber;

    public SOSController(TwilioConfig twilioConfig) {
        // Initialize Twilio with the credentials from TwilioConfig
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    // SOS Endpoint - Send SOS Message to Emergency Contacts
    @PostMapping("/send-sos")
    public ResponseEntity<String> sendSOS(@RequestBody SOSRequest sosRequest, HttpServletRequest request) {
        try {
            // Get userId from session or cookies
//            String userId = getUserIdFromSession(request);
            String userId = sosRequest.getUserId();
            System.out.println("SOS is requested from userID:"+userId);
            // Fetch emergency contacts of the logged-in user
            List<EmergencyContact> contacts = emergencyContactService.getAllContactsByUserId(userId);

            if (contacts.isEmpty()) {
                return ResponseEntity.status(404).body("No emergency contacts found.");
            }

            String messageBody = String.format(
                    "SOS! I am %s. You are my Emergency Contact and I have an emergency at Location: Latitude: %s, Longitude: %s. Please assist immediately. " +
                            "View the location on the map: https://www.google.com/maps?q=%s,%s",
                    sosRequest.getUsername(),
                    sosRequest.getLatitude(), sosRequest.getLongitude(),
                    sosRequest.getLatitude(), sosRequest.getLongitude());

            // Loop through all emergency contacts and send an SMS to each one
            for (EmergencyContact contact : contacts) {
                Message message = Message.creator(
                        new PhoneNumber(contact.getPhone()),  // Send SMS to contact's phone
                        new PhoneNumber(fromPhoneNumber),     // Twilio phone number
                        messageBody
                ).create();
            }

            return ResponseEntity.ok("SOS message sent to emergency contacts successfully.");
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Error sending SOS message: " + e.getMessage());
        }
    }

    // Helper function to get userId from cookies
    private String getUserIdFromSession(HttpServletRequest request) {
        Cookie[] cookies = request.getCookies();
        if (cookies != null) {
            for (Cookie cookie : cookies) {
                if ("userId".equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }
        }
        throw new IllegalArgumentException("User not logged in");
    }
}
