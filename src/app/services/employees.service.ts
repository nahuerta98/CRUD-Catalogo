import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EmployeeModel } from '../models/employee.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmployeesService {

  private url = 'https://crud-3bf0e-default-rtdb.firebaseio.com'

  constructor( private http: HttpClient) { }

  // CREATE
  createEmployee( employee: EmployeeModel) {
    return this.http.post(`${this.url}/employees.json`, employee )
    .pipe(
      map( (resp: any) => {
        employee.id = resp.name;
        return employee;
      } )
    );
  }

  // UPDATE
  updateEmployee( employee: EmployeeModel){
    const employeeTemp = {
      ...employee
    };
    delete employeeTemp.id;
    return this.http.put(`${this.url}/employees/${employee.id}.json`, employeeTemp);
  }

  // DELETE
  deleteEmployee(id:string){
    return this.http.delete(`${this.url}/employees/${id}.json`);
  }

  // GET EMPLOYEE BY ID
  getEmployee(id:string){
    return this.http.get(`${this.url}/employees/${id}.json`);
  }

  // GET
  getEmployees(){
    return this.http.get(`${this.url}/employees.json`)
    .pipe(
      map( this.crearArreglo)
    );
  }

  private crearArreglo (employeesObj: object){

    const employees : EmployeeModel[] = [];

    if (employeesObj === null) { return []; }

    Object.keys(employeesObj).forEach( key => {
      const employee: EmployeeModel = employeesObj[key];
      employee.id = key;

      employees.push(employee);
    })

    return employees;
  }




}
