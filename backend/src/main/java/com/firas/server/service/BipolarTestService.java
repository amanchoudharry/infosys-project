package com.firas.server.service;

import com.firas.server.model.BipolarTest;
import com.firas.server.repository.BipolarTestRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BipolarTestService {

    @Autowired
    private BipolarTestRepository repository;

    public BipolarTest processAndSaveTestResult(List<Integer> responses) {
        double averageScore = responses.stream().mapToInt(Integer::intValue).average().orElse(0.0);
        String status = averageScore < 5 ? "Below Average and Bipolar Person" : "Above Average and Needs Improvement";

        BipolarTest result = new BipolarTest();
        result.setAverageScore(averageScore);
        result.setStatus(status);

        return repository.save(result);
    }
}
