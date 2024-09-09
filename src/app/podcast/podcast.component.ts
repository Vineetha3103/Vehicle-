import { Component, OnInit } from '@angular/core';
import { NewsService } from '../news.service';

@Component({
  selector: 'app-podcast',
  templateUrl: './podcast.component.html',
  styleUrl: './podcast.component.css'
})
export class PodcastComponent implements OnInit {
  errorMessage: string='';

  constructor(private newService:NewsService){}
  

  articles:any[]=[];


  
  ngOnInit(): void {
    this.loadsources("bbc-news");
  }

  loadsources(source:string) {
    this.newService.getSource(source).subscribe(
      (data:any) => 
        {this.articles = data.articles.slice(0,4)}
      ,
      (error: any) => {
        this.errorMessage = 'Error fetching news: ' + error.message;
      }

    );
    
  }
}   
 