import { Component, OnInit } from '@angular/core';
import { PresupuestosService } from '../../../../presupuestos.service';
import { Articulo } from '../../../../../entities/articulo';

@Component({
  selector: 'jhi-repuestos-nuevopresupuesto',
  templateUrl: './repuestos-nuevopresupuesto.component.html',
  styles: []
})
export class RepuestosNuevopresupuestoComponent implements OnInit {

    repuestos: Articulo[] = [];

  constructor(private _presupuestoService: PresupuestosService) { }

  ngOnInit() {
      this._presupuestoService.buscarRepuestos().subscribe((repuestos)=>{
        this.repuestos.push(...repuestos);
        this.repuestos = repuestos;
        console.log(this.repuestos)
      })
  }

}
