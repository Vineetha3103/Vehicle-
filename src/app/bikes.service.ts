import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class BikeService {

  private apiUrl = 'http://localhost:8080/api/bikes/allbikes';  // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getBikes(): Observable<BikeGroups> {
    return this.http.get<BikeGroups>(this.apiUrl);
  }

  updateBike(id: number, bike: Bike): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, bike);
  }

  createBike(bike: Bike): Observable<any> {
    return this.http.post(this.apiUrl, bike);
  }

  deleteBike(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
