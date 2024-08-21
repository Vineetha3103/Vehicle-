package com.example.Vehicle.dto;

import lombok.Data;

@Data
public class ModelDto {
    private Long modelId;
    private String modelName;
    private String engineType;
    private Long BrandId;
    private Integer capacity;
    private Double price;
    private Long brandId;


    public Long getModelId() {
        return modelId;
    }

    public void setModelId(Long modelId) {
        this.modelId = modelId;
    }

    public String getModelName() {
        return modelName;
    }

    public void setModelName(String modelName) {
        this.modelName = modelName;
    }

    public String getEngineType() {
        return engineType;
    }

    public void setEngineType(String engineType) {
        this.engineType = engineType;
    }

    public Long getBrandId() {
        return BrandId;
    }

    public void setBrandId(Long brandId) {
        BrandId = brandId;
    }

    public Integer getCapacity() {
        return capacity;
    }

    public void setCapacity(Integer capacity) {
        this.capacity = capacity;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }
}