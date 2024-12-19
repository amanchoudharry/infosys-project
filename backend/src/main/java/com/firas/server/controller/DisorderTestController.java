package com.firas.server.controller;

import com.firas.server.model.DisorderTestResult;
import com.firas.server.service.DisorderTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/disorder-test")
@CrossOrigin
public class DisorderTestController {

    @Autowired
    private DisorderTestService service;

    @PostMapping
    public DisorderTestResult saveTestResult(@RequestBody List<Integer> responses) {
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }
        return service.processAndSaveTestResult(responses);
    }
}
