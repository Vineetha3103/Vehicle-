package com.example.Vehicle.service;

import com.example.Vehicle.model.Model;
import com.example.Vehicle.repository.ModelRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class ModelService {

    @Autowired
    private ModelRepository modelRepository;

    public List<Model> getAllModels() {
        return modelRepository.findAll();
    }

    public Optional<Model> getModelById(Long modelId) {
        if (modelId == null) {
            throw new IllegalArgumentException("Model ID cannot be null");
        }
        return modelRepository.findById(modelId);
    }

    public Model saveModel(Model model) {
        if (model == null || model.getModelName() == null || model.getModelName().isEmpty()) {
            throw new IllegalArgumentException("Model or model name cannot be null");
        }
        return modelRepository.save(model);
    }

    public void deleteModel(Long modelId) {
        if (modelId == null) {
            throw new IllegalArgumentException("Model ID cannot be null");
        }
        if (!modelRepository.existsById(modelId)) {
            throw new IllegalArgumentException("Model with ID " + modelId + " does not exist");
        }
        modelRepository.deleteById(modelId);
    }
}
