import { Component, OnInit } from '@angular/core';
import {PresupuestoService} from "../entities/presupuesto/presupuesto.service";
import {Presupuesto} from "../entities/presupuesto/presupuesto.model";
import {forEach} from "@angular/router/src/utils/collection";

@Component({
  selector: 'jhi-presupuestos',
  templateUrl: './presupuestos.component.html',
  styles: []
})
export class PresupuestosComponent implements OnInit {

    rows = [
        { name: 'Austin', fecha:'10/12/2017', motor: 'Ford', cliente: 'Mauri',sucursal:'san martin',importe:'1245',estado:'Presupuestado' },
        { name: 'Julian', fecha:'10/5/2017', motor: 'Peugeot', cliente: 'Martin',sucursal:'san martin',importe:'168787',estado:'EN proceso' },
        { name: 'Marcos', fecha:'12/8/2017', motor: 'Renault', cliente: 'Molina',sucursal:'Godoy Cruz',importe:'16984',estado:'Entregado' },
    ];
    columns = [
        { name: 'codigo' },
        { name: 'fecha' },
        { name: 'motor' },
        { name: 'cliente' },
        { name: 'sucursal' },
        { name: 'importe' },
        { name: 'estado' }
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
