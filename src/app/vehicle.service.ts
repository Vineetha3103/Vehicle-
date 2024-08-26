// vehicle.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Brand } from './vehicle-brands/vehicle-brands.component';

@Injectable({
  providedIn: 'root',
})
export class VehicleService {
  
  private apiUrl = 'http://localhost:8080'; // Replace with your actual backend URL

  constructor(private http: HttpClient) {}

  // Fetch all vehicle types  
  getVehicleTypes(): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/vehicles`);
  }

  getVehicleImages(): Observable<any[]> {
    const slides = [
      { url: 'assets/carimg/cars.jpg', description: 'Cars' },
      { url: '/assets/bike img/Hero Splendor Plus.webp ', description: 'BIKE' },
      { url: 'assets/lorry img/lorries.jpeg', description: 'LORRY' }
    ];
    return of(slides);
  }
 
  // Fetch brands by vehicle type ID
  getBrands(): Observable<any> {
    return this.http.get(`${this.apiUrl}/brands`);
  }

  // Fetch models by brand ID
  getModels(): Observable<any> {
    return this.http.get(`${this.apiUrl}/models`);
  }
  addVehicleType(vehicleData: { vehicleType: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/vehicles`, vehicleData); // Adjust the endpoint as per your backend API
  }
  addBrand(brandData: { vehicleId: string; brandName: string }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/brands`, brandData);
  }
  addModel(modelData: { brandId: string; modelName: string; engineType: string; capacity: number; price: number }): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/models`, modelData);
  }
  deleteVehicle(vehicleId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/vehicles/${vehicleId}`);
  } 
  
  deleteBrand(brandId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/brands/${brandId}`);
  }
  updateBrand(brandId: number, updatedBrand: any): Observable<any> {
    const url = `${this.apiUrl}/brands/${brandId}`; // Construct the URL with the brand ID
    return this.http.put(url, updatedBrand); // Use PUT method to send the update request
  }
  
  updateModel(modelId: number, updatedModel: any): Observable<any> {
    const url = `${this.apiUrl}/models/${modelId}`; // Construct the URL with the model ID
    return this.http.put(url, updatedModel); // Send the PUT request to update the model
  }

  // Delete a model
  deleteModel(modelId: number): Observable<any> {
    return this.http.delete<any>(`${this.apiUrl}/models/${modelId}`);
  }


}

