package com.firas.server.controller;

import com.firas.server.model.BipolarTest;
import com.firas.server.service.BipolarTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/bipolar-test")
@CrossOrigin
public class BipolarTestController {

    @Autowired
    private BipolarTestService service;

    @PostMapping
    public BipolarTest saveTestResult(@RequestBody List<Integer> responses) {
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }
        return service.processAndSaveTestResult(responses);
    }
}
