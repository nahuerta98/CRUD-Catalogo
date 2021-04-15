import { Component, OnInit } from '@angular/core';
import { EmployeeModel } from 'src/app/models/employee.model';
import { EmployeesService } from 'src/app/services/employees.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  employees: EmployeeModel[] = [];

  constructor( private employeesService: EmployeesService ) { }

  ngOnInit() {

    this.employeesService.getEmployees()
    .subscribe( resp => this.employees = resp);
  }

  deleteEmployee( employee: EmployeeModel, i:number){

    Swal.fire({
      icon: 'question',
      title: '¡Espera un momento!',
      text:`¿Seguro que deseas eliminar a ${employee.nombre}?`,
      showConfirmButton:true,
      showCancelButton:true,
    }).then(resp=>{

      if(resp.value){
        this.employees.splice(i, 1);
        this.employeesService.deleteEmployee(employee.id).subscribe();
      }
    });
  }
}
