package com.firas.server.service;

import com.firas.server.model.DepressionTestResult;
import com.firas.server.repository.DepressionTestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class DepressionTestService {

    @Autowired
    private DepressionTestResultRepository depressionTestResultRepository;

    public DepressionTestResult saveAssessment(DepressionTestResult request) {
        DepressionTestResult assessment = new DepressionTestResult();
        assessment.setUsername(request.getUsername());
        assessment.setAverageScore(request.getAverageScore());
        assessment.setStatus(request.getStatus());
        return depressionTestResultRepository.save(assessment);
    }
}
