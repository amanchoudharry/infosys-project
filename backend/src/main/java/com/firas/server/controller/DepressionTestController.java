package com.firas.server.controller;

import com.firas.server.model.DepressionTestResult;
import com.firas.server.service.DepressionTestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;

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
}
