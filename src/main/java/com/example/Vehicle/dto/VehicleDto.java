package com.example.Vehicle.dto;

import lombok.Data;
import java.util.List;

@Data
public class VehicleDto {

    private Long id;  // Ensure this is included
    private String vehicleType;
    private String imageFileName;
    private List<BrandDto> brands;
}
