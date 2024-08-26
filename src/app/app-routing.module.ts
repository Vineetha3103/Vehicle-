import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehicleTypesComponent } from './vehicle-types/vehicle-types.component';
import { VehicleBrandsComponent } from './vehicle-brands/vehicle-brands.component';
import { VehicleModelsComponent } from './vehicle-models/vehicle-models.component';

const routes: Routes = [
  { path: 'vehicle-types', component: VehicleTypesComponent },
  { path: 'brands/:vehicleId', component: VehicleBrandsComponent },
  { path: 'models/:brandId', component: VehicleModelsComponent },
  { path: '', redirectTo: '/vehicle-types', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
