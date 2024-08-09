import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class CarService {

  private apiUrl = 'http://localhost:8080/api/cars/allcars';  // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getCars(): Observable<CarGroups> {
    return this.http.get<CarGroups>(this.apiUrl);
  }

  updateCar(id: number, car: Car): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, car);
  }

  createCar(car: Car): Observable<any> {
    return this.http.post(this.apiUrl, car);
  }

  deleteCar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
