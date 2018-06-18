import { Component, OnInit, Input } from '@angular/core';
import { CobranzaRepuesto } from '../../../../../../entities/cobranza-repuesto';
import { TipoRepuesto } from '../../../../../../entities/tipo-repuesto';

@Component({
  selector: 'jhi-repuesto-precio',
  templateUrl: './repuesto-precio.component.html',
  styles: []
})
export class RepuestoPrecioComponent implements OnInit {
    @Input() repuesto: TipoRepuesto;
    seleccionado = false;
    precio = 0;

  constructor( ) {
   }

  ngOnInit() {
  }

  getSeleccionado(): Boolean {
      return this.seleccionado;
  }

  getArticuloAcobrar(): CobranzaRepuesto {

      const nuevaCobranzaRepuesto = new CobranzaRepuesto();
      nuevaCobranzaRepuesto.valor = this.precio;
      nuevaCobranzaRepuesto.tipoRepuesto = this.repuesto;
      return nuevaCobranzaRepuesto;
  }

}
