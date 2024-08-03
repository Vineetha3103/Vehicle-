import { Component, OnInit } from '@angular/core';
import { LorryService } from '../lorry.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lorries',
  templateUrl: './lorries.component.html',
  styleUrls: ['./lorries.component.css']
})
export class LorriesComponent implements OnInit {

  tataMotorsLorries: any[] = [];
  ashokLeylandLorries: any[] = [];
  mahindraLorries: any[] = [];
  EicherLorries: any[] = [];
  bharatBenzLorries: any[] = [];
  volvoLorries: any[] = [];

  constructor(private lorryService: LorryService, private router: Router ) { }

  ngOnInit(): void {
    this.lorryService.getTataMotorsLorries().subscribe(data => this.tataMotorsLorries = data);
    this.lorryService.getAshokLeylandLorries().subscribe(data => this.ashokLeylandLorries = data);
    this.lorryService.getMahindraLorries().subscribe(data => this.mahindraLorries = data);
    this.lorryService.getEicherLorries().subscribe(data => this.EicherLorries = data);
    this.lorryService.getBharatBenzLorries().subscribe(data => this.bharatBenzLorries = data);
    this.lorryService.getVolvoLorries().subscribe(data => this.volvoLorries = data);
  }

  editbike() {
    // Example data, replace with actual data as required
    const autoData = { id: 1, name: 'Updated Auto', brand: 'Updated Brand', model: '2023' };
    this.lorryService.updateLorries(autoData.id, autoData).subscribe(response => {
      console.log('Auto updated successfully', response);
      // Redirect or perform other actions after update
      this.router.navigate(['/autos']);
    }, error => {
      console.error('Error updating auto', error);
    });
  }

  deletebike() {
    const autoId = 1; // Replace with actual ID of the auto to be deleted
    this.lorryService.deleteLorries(autoId).subscribe(response => {
      console.log('Auto deleted successfully', response);
      // Redirect or perform other actions after deletion
      this.router.navigate(['/autos']);
    }, error => {
      console.error('Error deleting auto', error);
    });
  }

  goToPart(partId: string) {
    document.getElementById(partId)?.scrollIntoView({ behavior: 'smooth' });
  }
  
}
