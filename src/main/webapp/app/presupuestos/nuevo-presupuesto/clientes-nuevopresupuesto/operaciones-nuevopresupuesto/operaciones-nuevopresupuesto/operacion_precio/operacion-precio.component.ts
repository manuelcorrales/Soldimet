import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { CostoOperacion } from 'app/entities/costo-operacion/costo-operacion.model';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

@Component({
    selector: 'jhi-operacion-precio',
    templateUrl: './operacion-precio.component.html',
    styles: []
})
export class OperacionPrecioComponent implements OnInit {
    @Input() costoOperacion: CostoOperacion = null;
    seleccionado = false;
    @Output() eventoCambioValor = new EventEmitter<number>();

    constructor() {}

    ngOnInit() {}

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
        if (this.seleccionado) {
            return this.costoOperacion.costoOperacion;
        } else {
            return 0;
        }
    }
}
