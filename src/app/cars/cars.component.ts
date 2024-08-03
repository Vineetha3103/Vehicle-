// car.component.ts
import { Component, OnInit } from '@angular/core';
import { CarService } from '../car.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cars',
  templateUrl: 'cars.component.html',
  styleUrls: ['cars.component.css']
})
export class CarsComponent implements OnInit {

  products: any[] = [];
  Hitems: any[] = [];
  Fitems: any[] = [];
  Bitems: any[] = [];
  Mitems: any[] = [];
  Aitems: any[] = [];
  // Add other arrays for other brands

  constructor(private carService: CarService, private router:Router) {}

  ngOnInit(): void {
    this.loadToyotaCars();
    this.loadHondaCars();
    this.loadFordCars();
    this.loadBmwCars();
    this.loadMercedesCars();
    this.loadAudiCars();
    // Call other load methods
  }

  loadToyotaCars() {
    this.carService.getToyotaCars().subscribe(data => {
      this.products = data;
    });
  }

  loadHondaCars() {
    this.carService.getHondaCars().subscribe(data => {
      this.Hitems = data;
    });
  }

  loadFordCars() {
    this.carService.getFordCars().subscribe(data => {
      this.Fitems = data;
    });
  }

  loadBmwCars() {
    this.carService.getBmwCars().subscribe(data => {
      this.Bitems = data;
    });
  }
  loadMercedesCars() {
    this.carService.getMercedesCars().subscribe(data => {
      this.Mitems = data;
    });
  }
  loadAudiCars() {
    this.carService.getAudiCars().subscribe(data => {
      this.Aitems = data;
    });
  }

  editCar() {
    // Example data, replace with actual data as required
    const autoData = { id: 1, name: 'Updated Auto', brand: 'Updated Brand', model: '2023' };
    this.carService.updateCar(autoData.id, autoData).subscribe(response => {
      console.log('Auto updated successfully', response);
      // Redirect or perform other actions after update
      this.router.navigate(['/cars']);
    }, error => {
      console.error('Error updating auto', error);
    });
  }

  deleteCar() {
    const autoId = 1; // Replace with actual ID of the auto to be deleted
    this.carService.deleteCar(autoId).subscribe(response => {
      console.log('Auto deleted successfully', response);
      // Redirect or perform other actions after deletion
      this.router.navigate(['/cars']);
    }, error => {
      console.error('Error deleting auto', error);
    });
  }


  // Add other load methods for other brands

  goToPart(partId: string) {
    document.getElementById(partId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
