import { Component, OnInit } from '@angular/core';
import { AutoService } from '../autos.service';
import { Router } from '@angular/router';

interface Auto {
  id?: number;  // Optional ID field
  title: string;
  price: string;
  imageUrl: string;
  fueltype: string;
  capacity: string;
  Features: string;
}

interface AutoGroups {
  [key: string]: Auto[];
}

@Component({
  selector: 'app-autos',
  templateUrl: './autos.component.html',
  styleUrls: ['./autos.component.css']
})
export class AutosComponent implements OnInit {
  autos: AutoGroups = {};
  autoForm: Auto = { title: '', price: '', imageUrl: '', fueltype: '', capacity: '', Features: '' };
  editMode: boolean = false;
  currentGroup: string = '';
  showform: boolean = false;

  constructor(private autoService: AutoService, private router: Router) {}

  ngOnInit(): void {
    this.loadAutos();
  }

  loadAutos() {
    this.autoService.getAutos().subscribe({
      next: (data: AutoGroups) => {
        this.autos = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  saveAuto() {
    if (!this.currentGroup) {
      console.error('No current auto group selected');
      return;
    }

    if (this.editMode) {
      this.autoService.updateAuto(this.autoForm.id!, this.autoForm).subscribe({
        next: (response: any) => {
          console.log('Auto updated successfully', response);
          this.loadAutos();
        },
        error: (error: any) => {
          console.error('Error updating auto', error);
        }
      });
    } else {
      this.autoService.createAuto(this.autoForm).subscribe({
        next: (response: any) => {
          console.log('Auto created successfully', response);
          this.loadAutos();
        },
        error: (error: any) => {
          console.error('Error creating auto', error);
        }
      });
    }
    this.resetForm();
  }

  editAuto(auto: Auto, groupName: string) {
    this.autoForm = { ...auto };
    this.editMode = true;
    this.currentGroup = groupName;
    this.showform = true;
  }

  deleteAuto(id: number | undefined, groupName: string) {
    if (!id) {
      console.error('Invalid ID');
      return;
    }

    this.autoService.deleteAuto(id).subscribe({
      next: (response: any) => {
        console.log('Auto deleted successfully', response);
        this.loadAutos();
      },
      error: (error: any) => {
        console.error('Error deleting auto', error);
      }
    });
  }

  resetForm() {
    this.autoForm = { title: '', price: '', imageUrl: '', fueltype: '', capacity: '', Features: '' };
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
