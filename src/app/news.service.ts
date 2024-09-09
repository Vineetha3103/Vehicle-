import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private apiKey="6d7a1b8136be465984f7ad91b9e58dde" ;
  private apiUrl1="https://newsapi.org/v2/everything";
  private apiUrl2 = "https://newsapi.org/v2/top-headlines";
 


  constructor(private http:HttpClient) { }

  getNewsFromDomain(domain:string){
    const url = `${this.apiUrl1}?domains=${domain}&apiKey=${this.apiKey}`;
     return this.http.get(url);
  }

  getNews(country:string){
    const url = `${this.apiUrl2}?country=${country}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }

  getSource(source:string){
    const url = `${this.apiUrl2}?sources=${source}&apiKey=${this.apiKey}`;
    return this.http.get(url);
  }
}

 


