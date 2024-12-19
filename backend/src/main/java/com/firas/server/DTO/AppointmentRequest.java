package com.firas.server.DTO;

import lombok.Data;

@Data
public class AppointmentRequest {

    private String name;
    private String email;
    private String date;
    private String time;
    private String message;

}
