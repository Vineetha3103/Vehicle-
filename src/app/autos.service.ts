import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AutosService {
  private baseUrl = 'http://localhost:8080/api/auto';

  constructor(private http: HttpClient) { }

  getBajajAutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/bajaj`);
  }

  getPiaggioAutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/piaggio`);
  }

  getMahindraAutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/mahindra`);
  }

  getTVSAutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/tvs`);
  }

  getAtulAutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/atul`);
  }

  getLohiaAutos(): Observable<any> {
    return this.http.get(`${this.baseUrl}/lohia`);
  }

  updateAuto(id: number, autoData: any): Observable<any> {
    return this.http.put(`${this.baseUrl}/${id}`, autoData);
  }

  deleteAuto(id: number): Observable<any> {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}
