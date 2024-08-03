// car.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BikesService {

  private baseUrl = '/api';

  constructor(private http: HttpClient) {}

  getHeroMotorcarp(): Observable<any> {
    return this.http.get(`${this.baseUrl}/heromotorcarp`);
  }

  getHondaBikes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/hondabikes`);
  }

  getBajaj(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bajaj`);
  }

  getBMWMotorrad(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bmwmotorrad`);
  }

  getTvsBikes(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tvsbikes`);
  }

  getRoyalEnfield(): Observable<any> {
    return this.http.get(`${this.baseUrl}/royalenfield`);
  }
  updateAuto(id: number, autoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, autoData);
  }

  deleteAuto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
