package com.example.Vehicle.controller;

import com.example.Vehicle.dto.VehicleDto;
import com.example.Vehicle.model.Vehicle;
import com.example.Vehicle.service.VehicleService;
import com.example.Vehicle.util.EntityToDtoConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/vehicles")
@CrossOrigin(origins = "http://localhost:4200")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @GetMapping
    public ResponseEntity<List<VehicleDto>> getAllVehicles() {
        List<VehicleDto> vehicles = vehicleService.getAllVehicles().stream()
                .map(EntityToDtoConverter::convertToDto)
                .collect(Collectors.toList());
        if (vehicles.isEmpty()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(vehicles, HttpStatus.OK);
    }

    @GetMapping("/{id}")
    public ResponseEntity<VehicleDto> getVehicleById(@PathVariable Long id) {
        Optional<VehicleDto> vehicleDto = vehicleService.getVehicleById(id)
                .map(EntityToDtoConverter::convertToDto);
        return vehicleDto.map(ResponseEntity::ok)
                .orElseGet(() -> new ResponseEntity<>(HttpStatus.NOT_FOUND));
    }

    @PostMapping
    public ResponseEntity<VehicleDto> saveVehicle(@RequestBody VehicleDto vehicleDto) {
        if (vehicleDto == null || vehicleDto.getVehicleType() == null || vehicleDto.getVehicleType().isEmpty()) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        Vehicle vehicle = EntityToDtoConverter.convertToEntity(vehicleDto);
        Vehicle savedVehicle = vehicleService.saveVehicle(vehicle);
        VehicleDto savedVehicleDto = EntityToDtoConverter.convertToDto(savedVehicle);
        return new ResponseEntity<>(savedVehicleDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteVehicle(@PathVariable Long id) {
        if (!vehicleService.getVehicleById(id).isPresent()) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        vehicleService.deleteVehicle(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
