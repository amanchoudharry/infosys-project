package com.firas.server.controller;


import com.firas.server.DTO.EmailRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/newsletter")
@CrossOrigin
public class NewsletterController {

    @Autowired
    private JavaMailSender mailSender;

    @PostMapping
    public String subscribe(@RequestBody EmailRequest emailRequest) {
        try {
            // Send email
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(emailRequest.getEmail());
            message.setSubject("Newsletter Subscription");
            message.setText("Thank you for joining our newsletter! You will be an important member of our community.");
            mailSender.send(message);
            return "Subscription successful!";
        } catch (Exception e) {
            return "Subscription failed: " + e.getMessage();
        }
    }
}
