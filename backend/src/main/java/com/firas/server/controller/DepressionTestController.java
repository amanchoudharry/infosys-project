package com.firas.server.controller;

import com.firas.server.model.DepressionTestResult;
import com.firas.server.service.DepressionTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Optional;

@RestController
@RequestMapping("/api/depression-test")
@CrossOrigin
public class DepressionTestController {

    @Autowired
    private DepressionTestService depressionTestService;

    @PostMapping
    public ResponseEntity<?> submitAssessment(@RequestBody DepressionTestResult request) {
        try {
            DepressionTestResult assessment = depressionTestService.saveAssessment(request);
            return ResponseEntity.ok(assessment);
        } catch (Exception e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Collections.singletonMap("message", e.getMessage()));
        }
    }

    @GetMapping("/category/{userId}")
    public ResponseEntity<?> getDepressionCategory(@PathVariable String userId) {
        Optional<String> result = depressionTestService.findByUserId(userId);

        if (result.isPresent()) {
            String testResult = result.get();
            return ResponseEntity.ok().body(testResult);
        } else {
            return ResponseEntity.status(404).body("User not found or no test results available.");
        }
    }
}