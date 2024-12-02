package com.firas.server.controller;

import com.firas.server.model.DepressionTestResult;
import com.firas.server.service.DepressionTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/depression-test")
@CrossOrigin
public class DepressionTestController {

    @Autowired
    private DepressionTestService service;

    @PostMapping
    public DepressionTestResult saveTestResult(@RequestBody List<Integer> responses) {
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }
        return service.processAndSaveTestResult(responses);
    }
}
