import { Component, OnInit, Input } from '@angular/core';
import { DTOParOperacionPresupuestoComponent } from '../../../../../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';
import { CobranzaOperacion } from '../../../../../../entities/cobranza-operacion';
import { Operacion } from '../../../../../../entities/operacion';

@Component({
    selector: 'jhi-operacion-precio',
    templateUrl: './operacion-precio.component.html',
    styles: []
})
export class OperacionPrecioComponent implements OnInit {
    @Input()
    operacion: DTOParOperacionPresupuestoComponent;
    seleccionado = false;

    constructor() {
    }

    ngOnInit() {
    }

    getSeleccionado(): Boolean {
        return this.seleccionado;
    }

    getOperacionAcobrar(): CobranzaOperacion {

        const nuevaCobranzaRepuesto = new CobranzaOperacion();
        nuevaCobranzaRepuesto.cobranzaOperacion = this.operacion.costoOperacion;
        nuevaCobranzaRepuesto.operacion = this.operacion.operacionID as Operacion;
        return nuevaCobranzaRepuesto;
    }

}
