import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LorryService {

  private baseUrl = 'http://localhost:8080/api/lorry';

  constructor(private http: HttpClient) { }

  getTataMotorsLorries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tata-motors`);
  }

  getAshokLeylandLorries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/ashok-leyland`);
  }

  getMahindraLorries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mahindra`);
  }

  getBharatBenzLorries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bharatbenz`);
  }

  getEicherLorries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/eicher`);
  }

  getVolvoLorries(): Observable<any> {
    return this.http.get(`${this.baseUrl}/volvo`);
  }
  updateLorries(id: number, autoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, autoData);
  }

  deleteLorries(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }

  
  
}
