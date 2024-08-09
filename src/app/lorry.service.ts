import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

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

@Injectable({
  providedIn: 'root'
})
export class LorryService {

  private apiUrl = 'http://localhost:8080/api/lorries/alllorries';  // Update with your actual API URL

  constructor(private http: HttpClient) { }

  getLorries(): Observable<LorryGroups> {
    return this.http.get<LorryGroups>(this.apiUrl);
  }

  updateLorry(id: number, lorry: Lorry): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, lorry);
  }

  createLorry(lorry: Lorry): Observable<any> {
    return this.http.post(this.apiUrl, lorry);
  }

  deleteLorry(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
