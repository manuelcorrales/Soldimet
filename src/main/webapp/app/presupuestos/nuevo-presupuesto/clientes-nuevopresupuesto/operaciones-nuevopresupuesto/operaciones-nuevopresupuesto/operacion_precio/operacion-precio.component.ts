import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CobranzaOperacion } from '../../../../../../entities/cobranza-operacion';
import { Operacion, OperacionService } from '../../../../../../entities/operacion';
import { CostoOperacion } from '../../../../../../entities/costo-operacion';

@Component({
    selector: 'jhi-operacion-precio',
    templateUrl: './operacion-precio.component.html',
    styles: []
})
export class OperacionPrecioComponent implements OnInit {
    @Input() costoOperacion: CostoOperacion = null;
    seleccionado = false;
    @Output() eventoCambioValor = new EventEmitter<number>();

    constructor() {
    }

    ngOnInit() {
    }

    getOperacionAcobrar(): CobranzaOperacion {
        const nuevaCobranzaRepuesto = new CobranzaOperacion();
        nuevaCobranzaRepuesto.cobranzaOperacion = this.costoOperacion.costoOperacion;
        nuevaCobranzaRepuesto.operacion = this.costoOperacion.operacion;
        return nuevaCobranzaRepuesto;
    }

    cambioValor() {
        this.eventoCambioValor.emit();
    }

    getPrecio() {
        if ( this.seleccionado) {
            return this.costoOperacion.costoOperacion;
        }else {
            return 0;
        }
    }

}
