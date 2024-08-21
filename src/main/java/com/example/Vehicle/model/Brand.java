package com.example.Vehicle.model;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Entity
@Data
public class Brand {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long brandId; // Manual ID assignment

    private String brandName;

    @ManyToOne
    @JoinColumn(name = "vehicle_id")
    private Vehicle vehicle;

    private String imageUrl;

    @OneToMany(mappedBy = "brand", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<Model> models;
}
