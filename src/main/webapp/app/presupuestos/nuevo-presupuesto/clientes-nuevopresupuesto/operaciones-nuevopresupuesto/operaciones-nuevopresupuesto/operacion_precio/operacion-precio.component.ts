import { Component, OnInit, Input } from '@angular/core';
import { DTOParOperacionPresupuestoComponent } from '../../../../../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';

@Component({
  selector: 'jhi-operacion-precio',
  templateUrl: './operacion-precio.component.html',
  styles: []
})
export class OperacionPrecioComponent implements OnInit {
    @Input()
    operacion: DTOParOperacionPresupuestoComponent;
    seleccionado: boolean = false;

  constructor( ) {
   }

  ngOnInit() {
  }

}
