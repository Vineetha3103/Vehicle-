import { Component, OnInit } from '@angular/core';
import { AutosService } from '../autos.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {

  bajajAutos: any[] = [];
  piaggioAutos: any[] = [];
  mahindraAutos: any[] = [];
  tvsAutos: any[] = [];
  atulAutos: any[] = [];
  lohiaAutos: any[] = [];

  constructor(private autoService: AutosService, private router: Router) { }

  ngOnInit(): void {
    this.autoService.getBajajAutos().subscribe(data => this.bajajAutos = data);
    this.autoService.getPiaggioAutos().subscribe(data => this.piaggioAutos = data);
    this.autoService.getMahindraAutos().subscribe(data => this.mahindraAutos = data);
    this.autoService.getTVSAutos().subscribe(data => this.tvsAutos = data);
    this.autoService.getAtulAutos().subscribe(data => this.atulAutos = data);
    this.autoService.getLohiaAutos().subscribe(data => this.lohiaAutos = data);
  }
  editAuto() {
    // Example data, replace with actual data as required
    const autoData = { id: 1, name: 'Updated Auto', brand: 'Updated Brand', model: '2023' };
    this.autoService.updateAuto(autoData.id, autoData).subscribe(response => {
      console.log('Auto updated successfully', response);
      // Redirect or perform other actions after update
      this.router.navigate(['/autos']);
    }, error => {
      console.error('Error updating auto', error);
    });
  }

  deleteAuto() {
    const autoId = 1; // Replace with actual ID of the auto to be deleted
    this.autoService.deleteAuto(autoId).subscribe(response => {
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
