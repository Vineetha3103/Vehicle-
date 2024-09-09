import { Component, OnInit } from '@angular/core';
import { NewsService } from './news.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent  implements OnInit{
 
  title = 'NEWSPAPER';
  articles: any[]=[];
  errorMessage : string =''

  constructor(private newService:NewsService){}


  ngOnInit() {
   
    this.loadfromcountry("us");
    
  }


   

    
    loadfromcountry(country:string){
      this.newService.getNews(country).subscribe(
        (data:any) =>{
          this.articles=data.articles.slice(0,3);
        }
      );



  }

}




