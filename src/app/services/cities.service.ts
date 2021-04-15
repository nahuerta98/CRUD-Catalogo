import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Key } from 'protractor';
import { map } from 'rxjs/operators';
import { CityModel } from '../models/city.model';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  private url = 'https://crud-3bf0e-default-rtdb.firebaseio.com'

  constructor(private http: HttpClient) {

  }
  //CREATE
  createCity(city: CityModel) {
    return this.http.post(`${this.url}/cities.json`, city)
      .pipe(
        map((resp: any) => {
          city.id = resp.name;
          return city;
        })
      );
  }

  //UPDATE
  updateCity(city: CityModel) {

    const cityTemp = {
      ...city
    };

    delete cityTemp.id;
    return this.http.put(`${this.url}/cities/${city.id}.json`, cityTemp)
  }

  //DELETE
  deleteCity(id:string){
    return this.http.delete(`${this.url}/cities/${id}.json`);
  }

  //GET CITY FOR ID
  getCity( id:string){
    return this.http.get(`${this.url}/cities/${id}.json`);
  }

  // ARRAY 
  getCities(){
    return this.http.get(`${this.url}/cities.json`)
    .pipe(
      map(this.crearArreglo)
    );
  }

  private crearArreglo(citiesObj: object){
    const cities : CityModel[] = [];

    console.log(citiesObj);

    if (citiesObj === null){ return []; }

    Object.keys( citiesObj).forEach( key =>{
      const city: CityModel = citiesObj[key];
      city.id = key;

      cities.push(city);
      
    });
    return cities;
  }






}



