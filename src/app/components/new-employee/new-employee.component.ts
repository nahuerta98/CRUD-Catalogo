import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { EmployeeModel } from 'src/app/models/employee.model';
import { OfficeModel } from 'src/app/models/office.model';
import { EmployeesService } from 'src/app/services/employees.service';
import { OfficesService } from 'src/app/services/offices.service';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-new-employee',
  templateUrl: './new-employee.component.html',
  styleUrls: ['./new-employee.component.css']
})
export class NewEmployeeComponent implements OnInit {

  employee: EmployeeModel = new EmployeeModel();

  offices: OfficeModel[] = [];


  constructor(private employeesService: EmployeesService, private route: ActivatedRoute, private OfficesService: OfficesService) { }


  ngOnInit(): void {

    this.OfficesService.getOffices()
    .subscribe(resp=> this.offices = resp);


    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.employeesService.getEmployee(id)
      .subscribe( (resp: EmployeeModel) =>{
        this.employee = resp;
        this.employee.id = id;
      });
    }
  }

  guardar(form: NgForm) {
    if(form.invalid){
      console.log('Formulario no válido');
      return;
    }
    //Message
    Swal.fire({
      icon: 'info',
      title: 'Guardando Información',
      text: 'Espere un momento mientras se guarda la información...',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;


    if (this.employee.id) {
      peticion = this.employeesService.updateEmployee(this.employee);

    } else {
      peticion = this.employeesService.createEmployee(this.employee);
    }

    //Message
    peticion.subscribe(resp =>{
      Swal.fire({
        icon: 'success',
        title: 'Empleado # '+ this.employee.numEmpleado,
        text: '¡Información guardada satisfactoriamente!'
      });
    })
  }

}

