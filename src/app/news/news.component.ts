import { Component } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrl: './news.component.css'
})
export class NewsComponent {
  articles: any[]=[];
  errorMessage : string ='';
  first:any[]=[];
  second:any[]=[];
  third: any[]=[];

  constructor(private newService:NewsService){}


  ngOnInit() {
    this.loadFromDomains("techcrunch.com");
    
    
  }

  loadFromDomains(domain:string){
    this.newService.getNewsFromDomain(domain).subscribe(
      (data:any) => {
        this.articles = data.articles
        this.first = this.articles.slice(0, 1);
        this.second = this.articles.slice(2,6);
        this.third = this.articles.slice(6,);
      },
      (error: any) => {
        this.errorMessage = 'Error fetching news: ' + error.message;
      }

    );

}
}
