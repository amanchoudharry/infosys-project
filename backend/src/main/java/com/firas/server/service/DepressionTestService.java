package com.firas.server.service;

import com.firas.server.model.DepressionTestResult;
import com.firas.server.repository.DepressionTestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class DepressionTestService {

    @Autowired
    private DepressionTestResultRepository repository;

    public DepressionTestResult processAndSaveTestResult(List<Integer> responses) {
        double averageScore = responses.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        String status = averageScore < 5 ? "Below Average and Depressed" : "Above Average and Needs Improvement";

        DepressionTestResult result = new DepressionTestResult();
        result.setAverageScore(averageScore);
        result.setStatus(status);

        return repository.save(result);
    }
}
