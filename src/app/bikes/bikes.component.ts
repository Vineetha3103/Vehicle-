// car.component.ts
import { Component, OnInit } from '@angular/core';
import { BikesService } from '../bikes.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-bikes',
  templateUrl: './bikes.component.html',
  styleUrls: ['./bikes.component.css']
})
export class BikesComponent implements OnInit {

  products: any[] = [];
  items: any[] = [];
  sets: any[] = [];
  Bitems: any[] = [];
  Titems: any[] = [];
  Ritems : any[] = [];
  // Add other arrays for other brands

  constructor(private bikeService: BikesService, private router: Router) {}

  ngOnInit(): void {
    this.loadHeroMotorcarp();
    this.loadHondaBikes();
    this.loadBajaj();
    this.loadBMWMotorrad();
    this.loadTvsBikes();
    this.loadRoyalEnfield();
    // Call other load methods
  }

  loadHeroMotorcarp() {
    this.bikeService.getHeroMotorcarp().subscribe(data => {
      this.products = data;
    });
  }

  loadHondaBikes() {
    this.bikeService.getHondaBikes().subscribe(data => {
      this.items = data;
    });
  }

  loadBajaj() {
    this.bikeService.getBajaj().subscribe(data => {
      this.sets = data;
    });
  }

  loadBMWMotorrad() {
    this.bikeService.getBMWMotorrad().subscribe(data => {
      this.Bitems = data;
    });
  }

  loadTvsBikes() {
    this.bikeService.getTvsBikes().subscribe(data => {
      this.Titems = data;
    });
  }

  loadRoyalEnfield() {
    this.bikeService.getRoyalEnfield().subscribe(data => {
      this.Ritems = data;
    });
  }
  editbike() {
    // Example data, replace with actual data as required
    const autoData = { id: 1, name: 'Updated Auto', brand: 'Updated Brand', model: '2023' };
    this.bikeService.updateAuto(autoData.id, autoData).subscribe(response => {
      console.log('Auto updated successfully', response);
      // Redirect or perform other actions after update
      this.router.navigate(['/autos']);
    }, error => {
      console.error('Error updating auto', error);
    });
  }

  deletebike() {
    const autoId = 1; // Replace with actual ID of the auto to be deleted
    this.bikeService.deleteAuto(autoId).subscribe(response => {
      console.log('Auto deleted successfully', response);
      // Redirect or perform other actions after deletion
      this.router.navigate(['/autos']);
    }, error => {
      console.error('Error deleting auto', error);
    });
  }

  // Add other load methods for other brands

  goToPart(partId: string) {
    document.getElementById(partId)?.scrollIntoView({ behavior: 'smooth' });
  }
}
