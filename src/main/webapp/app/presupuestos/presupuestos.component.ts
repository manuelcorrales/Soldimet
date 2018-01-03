import { Component, OnInit } from '@angular/core';
import {PresupuestoService} from "../entities/presupuesto/presupuesto.service";
import {Presupuesto} from "../entities/presupuesto/presupuesto.model";

@Component({
  selector: 'jhi-presupuestos',
  templateUrl: './presupuestos.component.html',
  styles: []
})
export class PresupuestosComponent implements OnInit {

    rows = [
        { name: 'Austin', gender: 'Male', company: 'Swimlane' },
        { name: 'Dany', gender: 'Male', company: 'KFC' },
        { name: 'Molly', gender: 'Female', company: 'Burger King' },
    ];
    columns = [
        { prop: 'name' },
        { name: 'Gender' },
        { name: 'Company' }
    ];
    messages = { // Message to show when array is presented
                 // but contains no values
        emptyMessage: 'No data to display',

        // Footer total message
        totalMessage: 'total'};
    limit = 25;
    selectionType = "single";

    presupuestos: Presupuesto;

  constructor(private _presupuestoService: PresupuestoService) { }

  ngOnInit() {

      this._presupuestoService.find(null).toPromise()
      .then((presupuestoRespuesta)=>{
          this.presupuestos = presupuestoRespuesta;
      })
      .catch((error)=>{
          console.log("presupuesto service: "+error)
      });

  }

}
