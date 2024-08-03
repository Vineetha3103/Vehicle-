import { NgModule } from '@angular/core';
import { RouterModule, Routes,ExtraOptions } from '@angular/router';
import { CarouselComponent } from './carousel/carousel.component';
import { CarsComponent } from './cars/cars.component';
import { LorriesComponent } from './lorries/lorries.component';
import { AutosComponent } from './autos/autos.component';
import { BikesComponent } from './bikes/bikes.component';



const routes: Routes = [
  { path: '', component:CarouselComponent},
  { path: 'cars', component:CarsComponent },
  { path: 'lorries', component:LorriesComponent },
  { path: 'autos', component:AutosComponent },
  { path: 'bikes', component:BikesComponent },
  
];
const routerOptions: ExtraOptions =  {
  scrollPositionRestoration : 'enabled',
  anchorScrolling:'enabled'
}

@NgModule({
  imports: [ RouterModule.forRoot(routes,routerOptions)]
})
export class AppRoutingModule { }
