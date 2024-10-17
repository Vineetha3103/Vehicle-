import { Component } from '@angular/core';
import { DashboardComponent } from '../../layout/dashboard/dashboard.component';
import { LibraryComponent } from '../../layout/library/library.component';
import { FooterComponent } from '../../layout/footer/footer.component';
import { HeaderComponent } from '../../layout/header/header.component';
import { CommonModule } from '@angular/common';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [LibraryComponent,DashboardComponent,FooterComponent,HeaderComponent,CommonModule,HttpClientModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
