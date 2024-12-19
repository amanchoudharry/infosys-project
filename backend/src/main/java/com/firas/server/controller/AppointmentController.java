package com.firas.server.controller;

import com.firas.server.DTO.AppointmentRequest;
import com.firas.server.model.Appointment;
import com.firas.server.repository.AppointmentRepository;
import com.firas.server.service.AppointmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/appointments")
@CrossOrigin
public class AppointmentController {

    @Autowired
    AppointmentService service;

    @Autowired
    private AppointmentRepository appointmentRepository;

    @PostMapping
    public ResponseEntity<String> createAppointment(@RequestBody AppointmentRequest appointmentRequest,
                                                    @RequestHeader("userId") String userId) {
        try {
            service.saveAppointment(appointmentRequest, userId);
            return new ResponseEntity<>("Appointment created successfully", HttpStatus.CREATED);
        } catch (Exception e) {
            return new ResponseEntity<>("Error saving appointment: " + e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    // Get all appointments
    @GetMapping
    public ResponseEntity<List<Appointment>> getAllAppointments() {
        try {
            List<Appointment> appointments = appointmentRepository.findAll();
            if (appointments.isEmpty()) {
                return new ResponseEntity<>(HttpStatus.NO_CONTENT);
            }
            return new ResponseEntity<>(appointments, HttpStatus.OK);
        } catch (Exception e) {
            return new ResponseEntity<>(null, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    @GetMapping("/{userId}")
    public List<Appointment> getAppointments(@PathVariable String userId) {
        return service.getAppointmentsByUserId(userId);
    }

    @PutMapping("/{id}")
    public Appointment updateAppointmentStatus(
            @PathVariable String id,
            @RequestParam String status,
            @RequestParam String professionalName) {
        return service.updateAppointmentStatus(id, status, professionalName);
    }

    // Delete an appointment by ID
    @DeleteMapping("/{id}")
    public ResponseEntity<HttpStatus> deleteAppointment(@PathVariable("id") String id) {
        try {
            appointmentRepository.deleteById(id);
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
