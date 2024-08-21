import { Component, OnInit } from '@angular/core';
import { VehicleService } from '../vehicle.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'vehicle-types-component',
  templateUrl: './vehicle-types.component.html',
  styleUrls: ['./vehicle-types.component.css']
})
export class VehicleTypesComponent implements OnInit {

  vehicleTypes: any[] = [];
  vehicleImages: any[] = [];
  vehicleForm!: FormGroup ;
  slides:any[]=[];
  currentSlide = 0;
  translateX = 0;
  isFormVisible = false;
  isDeleteDropdownVisible = false;
  selectedVehicleId: number | null = null;

  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required]
    });

    this.loadVehicleTypes(); // Load vehicles on component initialization
  }
  loadVehicleTypes() {
    this.vehicleService.getVehicleTypes().subscribe((data) => {
      this.vehicleTypes = data;
    });
  }
  
  toggleDeleteDropdown() {
    this.isDeleteDropdownVisible = !this.isDeleteDropdownVisible;
  }
   

  ngOnInit(): void {
    this.vehicleService.getVehicleTypes().subscribe((data: any[]) => {
      this.vehicleTypes = data;
    });
    
    this.vehicleService.getVehicleImages().subscribe((data) => {
      this.slides = data;
    });
    this.vehicleForm = this.fb.group({
      vehicleType: ['', Validators.required]
    });
  }


  prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    } else {
      this.currentSlide = this.slides.length - 1;
    }
    this.translateX = -this.currentSlide * 100;
  }
  nextSlide(): void {
    if (this.currentSlide < this.slides.length - 1) {
      this.currentSlide++;
    } else {
      this.currentSlide = 0;
    }
    this.translateX = -this.currentSlide * 100;
  }

  deleteVehicle() {
    if (this.selectedVehicleId !== null) {
      this.vehicleService.deleteVehicle(this.selectedVehicleId).subscribe(() => {
        this.loadVehicleTypes(); // Refresh the list after deletion
        this.isDeleteDropdownVisible = false; // Hide dropdown after deletion
      });
    }
  }
  

  onSubmit(): void {
    if (this.vehicleForm.valid) {
      const vehicleData = this.vehicleForm.value;
      this.vehicleService.addVehicleType(vehicleData).subscribe(
        response => {
          // Handle successful response, e.g., display a success message or redirect
          console.log('Vehicle added successfully', response);
        },
        error => {
          // Handle error
          console.error('Error adding vehicle', error);

          this.vehicleForm.reset();
      this.isFormVisible = false;
        }
      );
    }
  }
  toggleForm() {
    this.isFormVisible = !this.isFormVisible;
  }

  
 
}
function ngOnInit() {
  throw new Error('Function not implemented.');
}

