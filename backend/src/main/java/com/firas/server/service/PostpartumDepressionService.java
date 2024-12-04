package com.firas.server.service;

import com.firas.server.model.PostpartumDepressionResult;
import com.firas.server.repository.PostpartumDepressionRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PostpartumDepressionService {

    @Autowired
    private PostpartumDepressionRepository repository;

    public PostpartumDepressionResult processAndSaveTestResult(List<Integer> responses) {
        double averageScore = responses.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        String status = averageScore < 5 ? "Below Average and Postpartum Depressed Person" : "Above Average and Needs Improvement";

        PostpartumDepressionResult result = new PostpartumDepressionResult();
        result.setAverageScore(averageScore);
        result.setStatus(status);

        return repository.save(result);
    }
}
