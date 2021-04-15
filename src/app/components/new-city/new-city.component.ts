import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { CityModel } from 'src/app/models/city.model';
import { CitiesService } from 'src/app/services/cities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-new-city',
  templateUrl: './new-city.component.html',
  styleUrls: ['./new-city.component.css']
})
export class NewCityComponent implements OnInit {

  city: CityModel = new CityModel();

  constructor(private CitiesService: CitiesService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    if (id !== 'nuevo' ){
      this.CitiesService.getCity( id )
      .subscribe( (resp: CityModel) =>{
        this.city = resp;
        this.city.id = id;
      });
    }
  }



  guardar(form: NgForm) {

    if(form.invalid){
      console.log('Formulario no válido');
      return;
    }

    Swal.fire({
      icon: 'info',
      title: 'Espere',
      text: 'Guardando Información',
      allowOutsideClick: false
    });
    Swal.showLoading();

    let peticion: Observable<any>;

    if (this.city.id) {
      peticion = this.CitiesService.updateCity(this.city);
    } else {
      peticion = this.CitiesService.createCity(this.city);
    }

    //Message
    peticion.subscribe(resp =>{
      Swal.fire({
        icon: 'success',
        title: 'Ciudad de '+ this.city.ciudad,
        text: '¡Información guardada satisfactoriamente!'
      });
    })
  }
}
