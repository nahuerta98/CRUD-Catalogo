//Components
import { NewEmployeeComponent } from '../app/components/new-employee/new-employee.component';
import { NewOfficeComponent } from '../app/components/new-office/new-office.component';
import { NewCityComponent } from '../app/components/new-city/new-city.component';
//List Components
import { EmployeeListComponent } from '../app/components/employee-list/employee-list.component';
import { OfficeListComponent } from '../app/components/office-list/office-list.component';
import { CityListComponent } from '../app/components/city-list/city-list.component';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
{ path: 'Empleado/:id', component: NewEmployeeComponent},
{ path: 'Oficina/:id', component: NewOfficeComponent},
{ path: 'Ciudad/:id', component: NewCityComponent},
{ path: 'listado-Empleados', component: EmployeeListComponent},
{ path: 'listado-Oficinas', component: OfficeListComponent},
{ path: 'listado-Ciudades', component: CityListComponent},
{ path: '**', component: EmployeeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
