import { Component, OnInit } from '@angular/core';
import { OfficesService} from '../../services/offices.service';
import { OfficeModel } from '../../models/office.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-office-list',
  templateUrl: './office-list.component.html',
  styleUrls: ['./office-list.component.css']
})
export class OfficeListComponent implements OnInit {

  offices: OfficeModel[] = [];



  constructor( private OfficesService: OfficesService) { }

  ngOnInit(): void {

    this.OfficesService.getOffices()
    .subscribe(resp=> this.offices = resp);

  }

  deleteOffice(office: OfficeModel, i:number){

    Swal.fire({
      icon: 'question',
      title: '¡Espera un momento!',
      text: `¿Seguro que deseas eliminar las Oficinas de ${office.oficina}?`,
      showCloseButton: true,
      showCancelButton: true
    }).then(resp=>{
      if (resp.value){
        this.offices.splice(i,1);
        this.OfficesService.deleteOffice(office.id).subscribe();
      }
    });
    
  }

   

}
