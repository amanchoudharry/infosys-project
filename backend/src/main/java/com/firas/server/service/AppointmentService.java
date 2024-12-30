package com.firas.server.service;

import com.firas.server.DTO.AppointmentRequest;
import com.firas.server.config.TwilioConfig;
import com.firas.server.model.Appointment;
import com.firas.server.repository.AppointmentRepository;
import com.twilio.Twilio;
import com.twilio.rest.api.v2010.account.Message;
import com.twilio.type.PhoneNumber;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;

    @Autowired
    private EmailService emailService;
    @Autowired
    private TwilioConfig twilioConfig;

    @Value("${twilio.fromPhoneNumber}")
    private String fromPhoneNumber;

    public AppointmentService(TwilioConfig twilioConfig) {
        // Initialize Twilio with the credentials from TwilioConfig
        Twilio.init(twilioConfig.getAccountSid(), twilioConfig.getAuthToken());
    }

    public void saveAppointment(AppointmentRequest request, String userId) {
        Appointment appointment = new Appointment();
        appointment.setName(request.getName());
        appointment.setEmail(request.getEmail());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setMessage(request.getMessage());
        appointment.setUserId(userId);
        appointment.setPhone(request.getPhone());
        repository.save(appointment);

        // Send a confirmation email to the user
        String subject = "Appointment Request Received";
        String body = "Dear " + request.getName() + ",\n\n" +
                "We have received your appointment request. Here are the details:\n" +
                "Date: " + request.getDate() + "\n" +
                "Time: " + request.getTime() + "\n\n" +
                "You will receive another response once a professional has been assigned to your request.\n\n" +
                "Thank you,\nTeam Mental Health";
        emailService.sendEmail(request.getEmail(), subject, body);

            Message message = Message.creator(
                    new PhoneNumber(request.getPhone()),  // Send SMS to contact's phone
                    new PhoneNumber(fromPhoneNumber),     // Twilio phone number
                    body
            ).create();
    }

    public Appointment updateAppointmentStatus(String id, String status, String professionalName) {
        Optional<Appointment> optionalAppointment = repository.findById(id);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointment.setAcceptedByProfessionalName(professionalName);

            Appointment updatedAppointment = repository.save(appointment);

            // Send confirmation email if the status is ACCEPTED
            if ("ACCEPTED".equalsIgnoreCase(status)) {
                String subject = "Appointment Confirmation";
                String body = "Greetings!\nDear " + appointment.getName() + ", " +
                        "Your appointment with " + professionalName + " has been successfully accepted.\n" +
                        "Date: " + appointment.getDate() + "\n" +
                        "Time: " + appointment.getTime() + "\n\n" +
                        "Thank you,\nTeam Mental Health";
                emailService.sendEmail(appointment.getEmail(), subject, body);

                Message message = Message.creator(
                        new PhoneNumber(appointment.getPhone()),  // Send SMS to contact's phone
                        new PhoneNumber(fromPhoneNumber),     // Twilio phone number
                        body
                ).create();
            }

            return updatedAppointment;
        }
        throw new RuntimeException("Appointment not found with ID: " + id);
    }

    public List<Appointment> getAppointmentsByUserId(String userId) {
        return repository.findByUserId(userId);
    }
}
