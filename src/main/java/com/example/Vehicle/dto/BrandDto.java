package com.example.Vehicle.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class BrandDto {

    private Long brandId; // Include this field
    private String brandName;
    private Long vehicleId;
    private String imageUrl;
    private List<ModelDto> models;
}
