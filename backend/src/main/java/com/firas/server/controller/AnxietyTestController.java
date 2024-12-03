package com.firas.server.controller;

import com.firas.server.model.AnxietyTestResult;
import com.firas.server.service.AnxietyTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/anxiety-test")
@CrossOrigin
public class AnxietyTestController {

    @Autowired
    private AnxietyTestService service;

    @PostMapping
    public AnxietyTestResult saveTestResult(@RequestBody List<Integer> responses) {
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }
        return service.processAndSaveTestResult(responses);
    }
}
