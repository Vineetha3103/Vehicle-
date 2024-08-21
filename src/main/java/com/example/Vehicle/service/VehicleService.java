package com.example.Vehicle.service;

import com.example.Vehicle.model.Vehicle;
import com.example.Vehicle.repository.VehicleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    public List<Vehicle> getAllVehicles() {
        return vehicleRepository.findAll();
    }

    public Optional<Vehicle> getVehicleById(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        return vehicleRepository.findById(id);
    }

    public Vehicle saveVehicle(Vehicle vehicle) {
        if (vehicle == null || vehicle.getVehicleType() == null || vehicle.getVehicleType().isEmpty()) {
            throw new IllegalArgumentException("Vehicle or vehicle type cannot be null or empty");
        }
        return vehicleRepository.save(vehicle);
    }

    public void deleteVehicle(Long id) {
        if (id == null) {
            throw new IllegalArgumentException("ID cannot be null");
        }
        if (!vehicleRepository.existsById(id)) {
            throw new IllegalArgumentException("Vehicle with ID " + id + " does not exist");
        }
        vehicleRepository.deleteById(id);
    }
}
