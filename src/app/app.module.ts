import { NgModule } from '@angular/core';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { NgbCarouselModule } from '@ng-bootstrap/ng-bootstrap';  // Correct import


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VehicleTypesComponent } from './vehicle-types/vehicle-types.component';
import { VehicleBrandsComponent } from './vehicle-brands/vehicle-brands.component';
import { VehicleModelsComponent } from './vehicle-models/vehicle-models.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    VehicleTypesComponent,
    VehicleBrandsComponent,
    VehicleModelsComponent
  ],
  imports: [
    NgbCarouselModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule

    
    
    
  ],
  providers: [
    provideClientHydration(),
    provideHttpClient(withFetch())  
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
