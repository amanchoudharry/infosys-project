package com.firas.server.service;

import com.firas.server.model.DepressionTestResult;
import com.firas.server.repository.DepressionTestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class DepressionTestService {

    @Autowired
    private DepressionTestResultRepository depressionTestResultRepository;

    public DepressionTestResult saveAssessment(DepressionTestResult request) {
        // Create a new assessment and set all required fields
        DepressionTestResult assessment = new DepressionTestResult();
        assessment.setUserId(request.getUserId());
        assessment.setUsername(request.getUsername());
        assessment.setAverageScore(request.getAverageScore());
        assessment.setStatus(request.getStatus());
        assessment.setDepressionCategory(request.getDepressionCategory());
        assessment.setRecommendedResources(request.getRecommendedResources());

        return depressionTestResultRepository.save(assessment);
    }
    public Optional<String> findByUserId(String userId) {
        return depressionTestResultRepository.findDepressionCategoryByUserId(userId);
    }
}
