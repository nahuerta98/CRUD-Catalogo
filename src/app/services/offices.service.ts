import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { OfficeModel } from '../models/office.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class OfficesService {

  private url = 'https://crud-3bf0e-default-rtdb.firebaseio.com';

  constructor( private http: HttpClient) { }

  //CREATE
  createOffice( office: OfficeModel){

    return this.http.post(`${this.url}/offices.json`, office )
    .pipe(
      map(
        (resp: any) => {
          office.id = resp.name;
          return office;
        }
      )
    );
  }

  //UPDATE
  updateOffice(office: OfficeModel){
    const officeTemp = {
      ...office
    };
    delete officeTemp.id;

    return this.http.put(`${this.url}/offices/${office.id}.json`, officeTemp);
  }

  //GET
  getOffice( id:string){
    return this.http.get(`${this.url}/offices/${id}.json`);
  }

  //DELETE
  deleteOffice(id:string){
    return this.http.delete(`${this.url}/offices/${id}.json`);
  }

  //SHOW INFO INTO TABLE
  getOffices(){
    return this.http.get(`${this.url}/offices.json`)
    .pipe(
      map(this.crearArreglo)
    );
  }

  private crearArreglo( officesObj: object){
    const offices: OfficeModel[] = [];

    if (officesObj === null ){ return [];}

    Object.keys(officesObj).forEach(key =>{
      const office: OfficeModel = officesObj[key];
      office.id = key;

      offices.push(office);
    })

    return offices;
  }
  















}
