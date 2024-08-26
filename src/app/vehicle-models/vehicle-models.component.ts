import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { VehicleService } from '../vehicle.service';



@Component({
  selector: 'app-models',
  templateUrl: './vehicle-models.component.html',
  styleUrls: ['./vehicle-models.component.css']
})
export class VehicleModelsComponent implements OnInit {
  models: any[] = [];
  brands: any[] = [];
  vehicleTypes: any[] = []; 
  showAddForm = false;
  showEditForm = false;
  showDeleteForm = false;
  addModelForm!: FormGroup;
  editModelForm!: FormGroup;
  deleteModelForm!: FormGroup;
  isFormVisible: boolean = true;
  value:any;


  constructor(private fb: FormBuilder, private vehicleService: VehicleService) {
   
    // Initialize the forms
    this.addModelForm = this.fb.group({
      brandId: ['', Validators.required],
      modelName: ['', Validators.required],
      engineType: ['', Validators.required],
      capacity: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });
    
      
    this.editModelForm = this.fb.group({
      modelId: [null, Validators.required],
      brandId: ['', Validators.required],
      modelName: ['', Validators.required],
      engineType: ['', Validators.required],
      capacity: ['', Validators.required],
      price: ['', Validators.required],
      imageUrl: ['', Validators.required]
    });

   

    this.deleteModelForm = this.fb.group({
      modelId: ['', Validators.required]
    });
  }

 
  ngOnInit(): void {
    this.loadModels();
    this.loadBrands();
    this.loadVehicleData();
   
  }

  // Load models from the service
  loadModels() {
    this.vehicleService.getModels().subscribe(models => {
      this.models = models;
      console.log(this.models)
    });
  }
  loadVehicleData(): void {
    this.vehicleService.getVehicleTypes().subscribe(
      data => {
        this.vehicleTypes = data;
      },
      error => {
        console.error('Error fetching vehicle data', error);
      }
    );
  }

  // Load brands from the service
  loadBrands() {
    this.vehicleService.getBrands().subscribe(brands => {
      this.brands = brands;
    });
  }

  // Handle Add Model form submission
  onAddSubmit() {
    if (this.addModelForm.valid) {
      this.vehicleService.addModel(this.addModelForm.value).subscribe(() => {
        this.loadModels();
        this.loadBrands();
        this.loadVehicleData();
         // Refresh the models list
        this.showAddForm = false; // Hide the form
        const modelData = this.addModelForm.value;
        console.log('Adding model:', modelData);
      });
    }
  }
  closeForm(){
    this.isFormVisible = false;
  }

  reset(){
    this.addModelForm.reset();
  }
 
  // Handle Edit Model form submission
  onEditSubmit(): void {
    console.log('Submit button clicked');
    console.log('Form Valid:', this.editModelForm.valid);
  
    if (this.editModelForm.valid) {
      const updatedModel = this.editModelForm.value;
      const modelId = updatedModel.modelId;
  
      this.vehicleService.updateModel(modelId, updatedModel).subscribe({
        next: () => {
          console.log('Model updated successfully');
          this.showEditForm = false;
        },
        error: (error) => {
          console.error('Error updating model', error);
          alert('An error occurred while updating the model. Please try again.');
        }
      });
    } else {
      console.error('Form is invalid');
    }
  }
  onEditModelSelection(event: Event) {
    // Cast the event target to HTMLSelectElement to access the value property
    const selectedModelId = +(event.target as HTMLSelectElement).value;  // The '+' is used to convert the value to a number
    
    if (this.models) {
      const selectedModel = this.models.find(model => model.modelId === selectedModelId);
      
      if (selectedModel) {
        this.editModelForm.patchValue({
          modelId: selectedModel.modelId || null,
          brandId: selectedModel.brandId || '',
          modelName: selectedModel.modelName || '',
          engineType: selectedModel.engineType || '',
          capacity: selectedModel.capacity || '',
          price: selectedModel.price || '',
          imageUrl: selectedModel.imageUrl || ''
        });
      }
    }
  }
  
  
  
 
  

  

  // Handle Delete Model form submission
  onDeleteSubmit() {
    if (this.deleteModelForm.valid) {
      const modelId = this.deleteModelForm.get('modelId')?.value;
      this.vehicleService.deleteModel(modelId).subscribe(() => {
        this.loadModels(); 
         // Refresh the models list
        this.showDeleteForm = false; // Hide the form
      });
    }
  }

  
}

