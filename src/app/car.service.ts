// car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getToyotaCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/toyota-cars`);
  }

  getHondaCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/honda-cars`);
  }

  getFordCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ford-cars`);
  }

  getBmwCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bmw-cars`);
  }

  getMercedesCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mercedes-cars`);
  }

  getAudiCars(): Observable<any> {
    return this.http.get(`${this.baseUrl}/audi-cars`);
  }
  updateCar(id: number, autoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, autoData);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
