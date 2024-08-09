import { Component, OnInit } from '@angular/core';
import { LorryService } from '../lorry.service';
import { Router } from '@angular/router';

interface Lorry {
  id?: number;  // Optional ID field
  title: string;
  price: string;
  imageUrl: string;
  fueltype: string;
  capacity: string;
  Features: string;
}

interface LorryGroups {
  [key: string]: Lorry[];
}

@Component({
  selector: 'app-lorries',
  templateUrl: './lorries.component.html',
  styleUrls: ['./lorries.component.css']
})
export class LorriesComponent implements OnInit {
  lorries: LorryGroups = {};
  lorryForm: Lorry = { title: '', price: '', imageUrl: '', fueltype: '', capacity: '', Features: '' };
  editMode: boolean = false;
  currentGroup: string = '';
  showform: boolean = false;

  constructor(private lorryService: LorryService, private router: Router) {}

  ngOnInit(): void {
    this.loadLorries();
  }

  loadLorries() {
    this.lorryService.getLorries().subscribe({
      next: (data: LorryGroups) => {
        this.lorries = data;
      },
      error: (error: any) => {
        console.error('There was an error!', error);
      }
    });
  }

  saveLorry() {
    if (!this.currentGroup) {
      console.error('No current lorry group selected');
      return;
    }

    if (this.editMode) {
      this.lorryService.updateLorry(this.lorryForm.id!, this.lorryForm).subscribe({
        next: (response: any) => {
          console.log('Lorry updated successfully', response);
          this.loadLorries();
        },
        error: (error: any) => {
          console.error('Error updating lorry', error);
        }
      });
    } else {
      this.lorryService.createLorry(this.lorryForm).subscribe({
        next: (response: any) => {
          console.log('Lorry created successfully', response);
          this.loadLorries();
        },
        error: (error: any) => {
          console.error('Error creating lorry', error);
        }
      });
    }
    this.resetForm();
  }

  editLorry(lorry: Lorry, groupName: string) {
    this.lorryForm = { ...lorry };
    this.editMode = true;
    this.currentGroup = groupName;
    this.showform = true;
  }

  deleteLorry(id: number | undefined, groupName: string) {
    if (!id) {
      console.error('Invalid ID');
      return;
    }

    this.lorryService.deleteLorry(id).subscribe({
      next: (response: any) => {
        console.log('Lorry deleted successfully', response);
        this.loadLorries();
      },
      error: (error: any) => {
        console.error('Error deleting lorry', error);
      }
    });
  }

  resetForm() {
    this.lorryForm = { title: '', price: '', imageUrl: '', fueltype: '', capacity: '', Features: '' };
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
