import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service'; // Assuming you have a service to handle API calls
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-vehicle-brands',
  templateUrl: './vehicle-brands.component.html',
  styleUrls: ['./vehicle-brands.component.css']
})
export class VehicleBrandsComponent implements OnInit {
  brandForm!: FormGroup;
  vehicleTypes: any[] = []; // To hold the vehicle types from backend
  brands: any[] = []; // To hold the existing brands
  isFormVisible = false;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private http: HttpClient ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      vehicleId: ['', Validators.required],
      brandName: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

    // Load vehicle types from the backend
    this.vehicleService.getVehicleTypes().subscribe(
      (data) => {
        this.vehicleTypes = data;
      },
      (error) => {
        console.error('Error fetching vehicle types', error);
      }
    );

    // Load existing brands
    this.vehicleService.getBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands', error);
      }
    );
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      const brandData = this.brandForm.value;
      this.vehicleService.addBrand(brandData).subscribe(
        (response) => {
          console.log('Brand added successfully', response);
          this.brands.push(response); // Optionally update the list of brands
        },
        (error) => {
          console.error('Error adding brand', error);
        }
      );
    }
  }
}
