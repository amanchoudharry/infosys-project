package com.firas.server.service;

import com.firas.server.model.ADHDTest;
import com.firas.server.repository.ADHDTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ADHDTestService {

    @Autowired
    private ADHDTestRepository repository;

    public ADHDTest processAndSaveTestResult(List<Integer> responses) {
        double averageScore = responses.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        String status = averageScore < 5 ? "Below Average and ADHD Person" : "Above Average and Needs Improvement";

        ADHDTest result = new ADHDTest();
        result.setAverageScore(averageScore);
        result.setStatus(status);

        return repository.save(result);
    }
}
