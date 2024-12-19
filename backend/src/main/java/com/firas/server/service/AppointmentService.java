package com.firas.server.service;

import com.firas.server.DTO.AppointmentRequest;
import com.firas.server.model.Appointment;
import com.firas.server.repository.AppointmentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AppointmentService {

    @Autowired
    private AppointmentRepository repository;
    public void saveAppointment(AppointmentRequest request, String userId) {
        Appointment appointment = new Appointment();
        appointment.setName(request.getName());
        appointment.setEmail(request.getEmail());
        appointment.setDate(request.getDate());
        appointment.setTime(request.getTime());
        appointment.setMessage(request.getMessage());
        appointment.setUserId(userId);
        repository.save(appointment);
    }

    public Appointment updateAppointmentStatus(String id, String status, String professionalName) {
        Optional<Appointment> optionalAppointment = repository.findById(id);
        if (optionalAppointment.isPresent()) {
            Appointment appointment = optionalAppointment.get();
            appointment.setStatus(status);
            appointment.setAcceptedByProfessionalName(professionalName);
            return repository.save(appointment);
        }
        throw new RuntimeException("Appointment not found with ID: " + id);
    }

    public List<Appointment> getAppointmentsByUserId(String userId) {
        return repository.findByUserId(userId);
    }


}
