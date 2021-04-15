import { Component, OnInit } from '@angular/core';
import { CityModel } from 'src/app/models/city.model';
import { CitiesService } from 'src/app/services/cities.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-city-list',
  templateUrl: './city-list.component.html',
  styleUrls: ['./city-list.component.css']
})
export class CityListComponent implements OnInit {

  //ARREGLO

  cities: CityModel[] = [];

  constructor( private CitiesService: CitiesService) { }

  ngOnInit(): void {
    this.CitiesService.getCities()
    .subscribe(resp => this.cities = resp);
  }

  //BORRAR ELEMENTO DE LA LISTA
  deleteCity(city: CityModel, i:number){

    Swal.fire({
      icon: 'question',
      title:'¡Espera un momento!',
      text: `¿Seguro que deseas eliminar la ciudad de ${city.ciudad}?`,
      showConfirmButton: true,
      showCancelButton:true,
    }).then(resp=>{
      if(resp.value){
        this.cities.splice(i,1);
        this.CitiesService.deleteCity(city.id).subscribe();
      }
    });
  }

}
