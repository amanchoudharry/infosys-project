package com.firas.server.controller;

import com.firas.server.model.PostpartumDepressionResult;
import com.firas.server.service.PostpartumDepressionService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/postpartum-test")
@CrossOrigin
public class PostpartumDepressionController {

    @Autowired
    private PostpartumDepressionService service;

    @PostMapping
    public PostpartumDepressionResult saveTestResult(@RequestBody List<Integer> responses) {
        if (responses == null || responses.isEmpty()) {
            throw new IllegalArgumentException("Responses cannot be null or empty");
        }
        return service.processAndSaveTestResult(responses);
    }
}
