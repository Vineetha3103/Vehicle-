import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service'; // Assuming you have a service to handle API calls

@Component({
  selector: 'app-vehicle-models',
  templateUrl: './vehicle-models.component.html',
  styleUrls: ['./vehicle-models.component.css']
})
export class VehicleModelsComponent implements OnInit {
  showForm = false;
  modelForm!: FormGroup;
  brands: any[] = []; // To hold the brands from backend
  models: any[] = []; // To hold the existing models

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {}

  ngOnInit(): void {
    this.modelForm = this.fb.group({
      brandId: ['', Validators.required],
      modelName: ['', Validators.required],
      engineType: ['', Validators.required],
      capacity: ['', [Validators.required, Validators.min(1)]],
      price: ['', [Validators.required, Validators.min(1)]]
    });

    // Load brands from the backend
    this.vehicleService.getBrands().subscribe(
      (data) => {
        this.brands = data;
      },
      (error) => {
        console.error('Error fetching brands', error);
      }
    );

    // Load existing models
    this.vehicleService.getModels().subscribe(
      (data) => {
        this.models = data;
      },
      (error) => {
        console.error('Error fetching models', error);
      }
    );
  }

  onSubmit(): void {
    if (this.modelForm.valid) {
      const modelData = this.modelForm.value;
      this.vehicleService.addModel(modelData).subscribe(
        (response) => {
          console.log('Model added successfully', response);
          this.models.push(response); // Optionally update the list of models
        },
        (error) => {
          console.error('Error adding model', error);
        }
      );
    }
  }
}
