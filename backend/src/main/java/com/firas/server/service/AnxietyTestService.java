package com.firas.server.service;

import com.firas.server.model.AnxietyTestResult;
import com.firas.server.repository.AnxietyTestResultRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AnxietyTestService {

    @Autowired
    private AnxietyTestResultRepository repository;

    public AnxietyTestResult processAndSaveTestResult(List<Integer> responses) {
        double averageScore = responses.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        String status = averageScore < 5 ? "Below Average and Anxiety Person" : "Above Average and Needs Improvement";

        AnxietyTestResult result = new AnxietyTestResult();
        result.setAverageScore(averageScore);
        result.setStatus(status);

        return repository.save(result);
    }
}
