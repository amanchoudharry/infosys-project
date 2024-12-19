package com.firas.server.controller;

import com.firas.server.model.AnxietyTestResult;
import com.firas.server.model.DepressionTestResult;
import com.firas.server.service.AnxietyTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/anxiety-test")
@CrossOrigin
public class AnxietyTestController {

    @Autowired
    private AnxietyTestService service;

    @PostMapping
    public ResponseEntity<?> saveTestResult(@RequestBody AnxietyTestResult request) {
        try {
            AnxietyTestResult assessment = service.saveAssessment(request);
            return ResponseEntity.ok(assessment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @GetMapping("/category/{userId}")
    public ResponseEntity<?> getDepressionCategory(@PathVariable String userId) {
        Optional<String> result = service.findByUserId(userId);

        if (result.isPresent()) {
            String testResult = result.get();
            return ResponseEntity.ok().body(testResult);
        } else {
            return ResponseEntity.status(404).body("User not found or no test results available.");
        }
    }
}
