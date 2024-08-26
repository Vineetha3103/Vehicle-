import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service'; // Assuming you have a service to handle API calls
import { HttpClient } from '@angular/common/http';
import { log } from 'node:console';


export interface Brand {
  brandId?: number;  // Optional because it may be auto-generated
  vehicleId: number;
  brandName: string;
  imageUrl: string;
}

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
  isDeleteDropdownVisible = false;
  selectedVehicleTypeId: number | null = null;
  selectedBrandId:number| null=null;
  isEditFormVisible = false;
  editBrandForm!: FormGroup;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService, private http: HttpClient ) {}

  ngOnInit(): void {
    this.brandForm = this.fb.group({
      vehicleId: ['', Validators.required],
      brandName: ['', Validators.required],
      imageUrl: ['', Validators.required] 
    });

    this.editBrandForm = this.fb.group({
      brandId: ['', Validators.required],
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
    this.loadBrands();
  }
  loadVehicletypes(){
    this.vehicleService.getBrands().subscribe(
      (data) => {
        this.brands = data;
        
      },
      (error) => {
        console.error('Error fetching brands', error);
      }
    );
  }

  loadBrands(){
    this.vehicleService.getBrands().subscribe((data) => {
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
  toggleDeleteDropdown() {
    this.isDeleteDropdownVisible = !this.isDeleteDropdownVisible;
  }

  onSubmit(): void {
    if (this.brandForm.valid) {
      const brandData = this.brandForm.value;
      this.vehicleService.addBrand(brandData).subscribe(
        (response) => {
          this.loadBrands();
          console.log('Brand added successfully', response);
          this.brands.push(response); // Optionally update the list of brands
        },
        
        (error) => {
          console.error('Error adding brand', error);
          this.loadBrands();
        }
       
      );
      
    }
  }

  brandsByVehicleType(vehicleId: number) {
    return this.brands.filter(brand => brand.vehicleId === vehicleId);
  }
  onVehicleTypeChange(event: any) {
    this.selectedVehicleTypeId = event.target.value;
  }  

  deleteBrandfromlist(){
    if (this.selectedBrandId !== null) {
      this.vehicleService.deleteBrand(this.selectedBrandId).subscribe(() => {
        this.loadBrands(); // Refresh the list after deletion
        this.isDeleteDropdownVisible = false; // Hide dropdown after deletion
      });
    }
  }
  closeForm() {
    this.isFormVisible = false;
  }
  toggleEditForm() {
    this.isEditFormVisible = !this.isEditFormVisible;
  }

  onBrandSelect(event: any) {
    const selectedBrandId = event.target.value;
    const selectedBrand = this.brands.find(brand => brand.brandId === selectedBrandId);
    if (selectedBrand) {
      this.editBrandForm.patchValue({
        vehicleId: selectedBrand.vehicleId,
        brandName: selectedBrand.brandName,
        imageUrl: selectedBrand.imageUrl
      });
    }
  }

 
 
  onEditSubmit() {
    if (this.editBrandForm.valid) {
      const updatedBrand = this.editBrandForm.value;
      const brandId = updatedBrand.brandId; // Extract the brand ID from the form data

      this.vehicleService.updateBrand(brandId, updatedBrand).subscribe(() => {
        this.loadBrands(); 
        this.loadVehicletypes();
        // Handle successful update, e.g., reload the brand list, show a success message, etc.
      }, error => {
        console.error('Error updating brand', error);
        // Handle error case, e.g., show an error message
      });
    }
  }

  
}


