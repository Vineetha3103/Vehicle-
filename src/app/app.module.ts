import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { CarsComponent } from './cars/cars.component';
import { BikesComponent } from './bikes/bikes.component';
import { LorriesComponent } from './lorries/lorries.component';
import { AutosComponent } from './autos/autos.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { CarouselComponent } from './carousel/carousel.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { CarService } from './car.service';
import { RouterModule,Routes,ExtraOptions } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LorryService } from './lorry.service';
import { BikesService } from './bikes.service';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';



const routes: Routes = [
  { path: '', component:NavBarComponent},
  { path: 'cars', component: CarsComponent },
  { path: 'lorries', component: LorriesComponent },
  { path: 'autos', component: AutosComponent },
  { path: 'bikes', component: BikesComponent },
  { path: '**', component: AutosComponent }
];
const routerOptions: ExtraOptions =  {
  scrollPositionRestoration : 'enabled',
  anchorScrolling:'enabled'
}



@NgModule({
  declarations: [
    AppComponent,
    CarsComponent,
    BikesComponent,
    LorriesComponent,
    AutosComponent,
    NavBarComponent,
    CarouselComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes,routerOptions),
    BrowserAnimationsModule,
    NgbModule,
    CommonModule,
    HttpClientModule,
    
  ],
  providers: [
    provideAnimationsAsync(),
    CarService,
    LorryService,
    BikesService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
