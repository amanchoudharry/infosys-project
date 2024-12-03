package com.firas.server.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@CrossOrigin(origins = "http://localhost:5173") // Allow only requests from this origin
public class CallController {

    // Endpoint to handle call initiation
    @PostMapping("/call")
    public String initiateCall() {
        return "hello";
    }

    // DTO for the incoming request
    public static class CallRequest {
        private String contact;

        // Getter and Setter
        public String getContact() {
            return contact;
        }

        public void setContact(String contact) {
            this.contact = contact;
        }
    }
}
