package com.example.Vehicle.service;

import com.example.Vehicle.model.Brand;
import com.example.Vehicle.repository.BrandRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class BrandService {

    @Autowired
    private BrandRepository brandRepository;

    public List<Brand> getAllBrands() {
        return brandRepository.findAll();
    }

    public Optional<Brand> getBrandById(Long brandId) {
        if (brandId == null) {
            throw new IllegalArgumentException("Brand ID cannot be null");
        }
        return brandRepository.findById(brandId);
    }

    public Brand saveBrand(Brand brand) {
        if (brand == null || brand.getBrandName() == null || brand.getBrandName().isEmpty()) {
            throw new IllegalArgumentException("Brand or brand name cannot be null or empty");
        }
        return brandRepository.save(brand);
    }

    public void deleteBrand(Long brandId) {
        if (brandId == null) {
            throw new IllegalArgumentException("Brand ID cannot be null");
        }
        if (!brandRepository.existsById(brandId)) {
            throw new IllegalArgumentException("Brand with ID " + brandId + " does not exist");
        }
        brandRepository.deleteById(brandId);
    }
}
