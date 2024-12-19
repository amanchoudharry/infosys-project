package com.firas.server.service;

import com.firas.server.model.AnxietyTestResult;
import com.firas.server.repository.AnxietyTestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AnxietyTestService {

    @Autowired
    private AnxietyTestResultRepository repository;

    public AnxietyTestResult saveAssessment(AnxietyTestResult request) {
        // Create a new assessment and set all required fields
        AnxietyTestResult assessment = new AnxietyTestResult();
        assessment.setUserId(request.getUserId());
        assessment.setUsername(request.getUsername());
        assessment.setAverageScore(request.getAverageScore());
        assessment.setStatus(request.getStatus());
        assessment.setAnxietyCategory(request.getAnxietyCategory());
        assessment.setRecommendedResources(request.getRecommendedResources());

        return repository.save(assessment);
    }

    public Optional<String> findByUserId(String userId) {
        return repository.findAnxietyCategoryByUserId(userId);
    }
}
