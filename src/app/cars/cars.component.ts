import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router } from '@angular/router';

interface Car {
  id?: number;  // Optional ID field
  title: string;
  price: string;
  imageUrl: string;
  fueltype: string;
  capacity: string;
  Features: string;
}

interface CarGroups {
  [key: string]: Car[];
}

@Component({
  selector: 'app-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  cars: CarGroups = {};
  carForm: Car = { title: '', price: '', imageUrl: '', fueltype: '', capacity: '', Features: '' };
  editMode: boolean = false;
  currentGroup: string = '';
  showform: boolean = false;

  constructor(private carService: CarService, private router: Router) {}

  ngOnInit(): void {
    this.loadCars();
  }

  loadCars() {
    this.carService.getCars().subscribe({
      next: (data: CarGroups) => {
        this.cars = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  saveCar() {
    if (!this.currentGroup) {
      console.error('No current car group selected');
      return;
    }

    if (this.editMode) {
      this.carService.updateCar(this.carForm.id!, this.carForm).subscribe({
        next: (response: any) => {
          console.log('Car updated successfully', response);
          this.loadCars();
        },
        error: (error: any) => {
          console.error('Error updating car', error);
        }
      });
    } else {
      this.carService.createCar(this.carForm).subscribe({
        next: (response: any) => {
          console.log('Car created successfully', response);
          this.loadCars();
        },
        error: (error: any) => {
          console.error('Error creating car', error);
        }
      });
    }
    this.resetForm();
  }

  editCar(car: Car, groupName: string) {
    this.carForm = { ...car };
    this.editMode = true;
    this.currentGroup = groupName;
    this.showform = true;
  }

  deleteCar(id: number | undefined, groupName: string) {
    if (!id) {
      console.error('Invalid ID');
      return;
    }

    this.carService.deleteCar(id).subscribe({
      next: (response: any) => {
        console.log('Car deleted successfully', response);
        this.loadCars();
      },
      error: (error: any) => {
        console.error('Error deleting car', error);
      }
    });
  }

  resetForm() {
    this.carForm = { title: '', price: '', imageUrl: '', fueltype: '', capacity: '', Features: '' };
    this.editMode = false;
    this.currentGroup = '';
    this.showform = false;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goToPart(partId: string) {
    document.getElementById(partId)?.scrollIntoView({ behavior: 'smooth' });
  }

  openform() {
    this.showform = true;
  }
}
