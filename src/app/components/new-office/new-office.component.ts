import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { OfficeModel } from '../../models/office.model';
import { CityModel } from 'src/app/models/city.model';
import { CitiesService } from 'src/app/services/cities.service';
import { OfficesService } from '../../services/offices.service';
import { Observable } from 'rxjs';
import Swal from 'sweetalert2';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-new-office',
  templateUrl: './new-office.component.html',
  styleUrls: ['./new-office.component.css']
})
export class NewOfficeComponent implements OnInit {

  office: OfficeModel = new OfficeModel();

   cities: CityModel[] = [];
  

  constructor(private CitiesService: CitiesService, private OfficesService: OfficesService, private route: ActivatedRoute ) { }

  ngOnInit(): void {
    this.CitiesService.getCities()
    .subscribe(resp => this.cities = resp);

    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo'){
      this.OfficesService.getOffice(id)
      .subscribe((resp:OfficeModel)=>{
        this.office = resp;
        this.office.id = id;
      });
    }

  }

  guardar( form:NgForm ){

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


    if( this.office.id){
      peticion = this.OfficesService.updateOffice(this.office);

    }else{
      peticion = this.OfficesService.createOffice(this.office);

    }
     //Message
    peticion.subscribe(resp =>{
      Swal.fire({
        icon: 'success',
        title: 'Oficina ' + this.office.oficina,
        text: '¡Información guardada satisfactoriamente!'
      });
    })

    
  }


  

}
