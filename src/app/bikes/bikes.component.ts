import { Component, OnInit } from '@angular/core';
import { BikeService } from '../bikes.service';
import { Router } from '@angular/router';

interface Bike {
  id?: number;  // Optional ID field
  title: string;
  price: string;
  imageUrl: string;
  engine: string;
  mileage: string;
  features: string;
}

interface BikeGroups {
  [key: string]: Bike[];
}

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {
  bikes: BikeGroups = {};
  bikeForm: Bike = { title: '', price: '', imageUrl: '', engine: '', mileage: '', features: '' };
  editMode: boolean = false;
  currentGroup: string = '';
  showForm: boolean = false;

  constructor(private bikeService: BikeService, private router: Router) {}

  ngOnInit(): void {
    this.loadBikes();
  }

  loadBikes() {
    this.bikeService.getBikes().subscribe({
      next: (data: BikeGroups) => {
        this.bikes = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  saveBike() {
    if (!this.currentGroup) {
      console.error('No current bike group selected');
      return;
    }

    if (this.editMode) {
      this.bikeService.updateBike(this.bikeForm.id!, this.bikeForm).subscribe({
        next: (response: any) => {
          console.log('Bike updated successfully', response);
          this.loadBikes();
        },
        error: (error: any) => {
          console.error('Error updating bike', error);
        }
      });
    } else {
      this.bikeService.createBike(this.bikeForm).subscribe({
        next: (response: any) => {
          console.log('Bike created successfully', response);
          this.loadBikes();
        },
        error: (error: any) => {
          console.error('Error creating bike', error);
        }
      });
    }
    this.resetForm();
  }

  editBike(bike: Bike, groupName: string) {
    this.bikeForm = { ...bike };
    this.editMode = true;
    this.currentGroup = groupName;
    this.showForm = true;
  }

  deleteBike(id: number | undefined, groupName: string) {
    if (!id) {
      console.error('Invalid ID');
      return;
    }

    this.bikeService.deleteBike(id).subscribe({
      next: (response: any) => {
        console.log('Bike deleted successfully', response);
        this.loadBikes();
      },
      error: (error: any) => {
        console.error('Error deleting bike', error);
      }
    });
  }

  resetForm() {
    this.bikeForm = { title: '', price: '', imageUrl: '', engine: '', mileage: '', features: '' };
    this.editMode = false;
    this.currentGroup = '';
    this.showForm = false;
  }

  objectKeys(obj: any): string[] {
    return Object.keys(obj);
  }

  goToPart(partId: string) {
    document.getElementById(partId)?.scrollIntoView({ behavior: 'smooth' });
  }

  openForm() {
    this.showForm = true;
  }
}
