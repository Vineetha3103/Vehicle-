import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class AutoService {

  private apiUrl = 'http://localhost:8080/api/autos/allautos';  // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getAutos(): Observable<AutoGroups> {
    return this.http.get<AutoGroups>(this.apiUrl);
  }

  updateAuto(id: number, auto: Auto): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, auto);
  }

  createAuto(auto: Auto): Observable<any> {
    return this.http.post(this.apiUrl, auto);
  }

  deleteAuto(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
