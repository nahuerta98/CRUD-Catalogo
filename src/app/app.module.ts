import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
//Forms
import { FormsModule, ReactiveFormsModule} from '@angular/forms';

//HTTP
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NewEmployeeComponent } from './components/new-employee/new-employee.component';
import { NewOfficeComponent } from './components/new-office/new-office.component';
import { NewCityComponent } from './components/new-city/new-city.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { OfficeListComponent } from './components/office-list/office-list.component';
import { CityListComponent } from './components/city-list/city-list.component';


@NgModule({
  declarations: [
    AppComponent,
    NewEmployeeComponent,
    NewOfficeComponent,
    NewCityComponent,
    EmployeeListComponent,
    OfficeListComponent,
    CityListComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule, 
    HttpClientModule, 
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
