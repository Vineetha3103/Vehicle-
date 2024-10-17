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
  selectedPath: any;
  department: any = {};
  posts: any = [];

  constructor(private http:HttpClient,private route:ActivatedRoute,private router:Router){}


    ngOnInit(): void {
    

        this.http.get<any>("assets/dashboard.json").subscribe(data => {
          this.learningPaths = data.learningPaths;
       }); 
       
      this.route.paramMap.subscribe(params => {
        this.departmentName = params.get('departmentName');
        if (this.departmentName) {
          this.selectedPath = this.learningPaths.find(
            path => path.department === this.departmentName
          );
        }
      });
    
  
  
    
        
  }
  goToDepartment(department: string) {
    this.router.navigate(['/department',department]);
  }
}
