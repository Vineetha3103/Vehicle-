import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  learningPaths: any[] = [];
  departmentName: string | null = '';
  
  department: any = {};
  posts: any = [];
  selectedPath: any = null;

  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router){}


    ngOnInit(): void {
    

        this.http.get<any>("assets/dashboard.json").subscribe(data => {
          this.learningPaths = data.learningPaths;
       });   
        
  }
  goToDepartment(department: string) {
    this.selectedPath = this.learningPaths.find(path => path.department === department)
  }
}
