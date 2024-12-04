package com.firas.server.controller;

import com.firas.server.model.ADHDTest;
import com.firas.server.service.ADHDTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/adhd-test")
@CrossOrigin
public class ADHDTestController {

    @Autowired
    private ADHDTestService service;

    @PostMapping
    public ADHDTest saveTestResult(@RequestBody List<Integer> responses) {
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }
        return service.processAndSaveTestResult(responses);
    }
}
