import { Component, Input, Output, OnInit, ViewChildren, QueryList } from '@angular/core';
import { DetallePresupuesto } from '../../../../../entities/detalle-presupuesto/detalle-presupuesto.model';
import { DTOParOperacionPresupuestoComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';
import { PresupuestosService } from '../../../../presupuestos.service';
import { DTODatosMotorComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { CobranzaOperacion } from '../../../../../entities/cobranza-operacion';
import { BaseEntity } from './../../../../../shared';
import { Operacion } from '../../../../../entities/operacion';
import { OperacionPrecioComponent } from './operacion_precio/operacion-precio.component';

@Component({
    selector: 'jhi-operaciones-nuevopresupuesto',
    templateUrl: './operaciones-nuevopresupuesto.component.html',
    styles: []
})
export class OperacionesNuevopresupuestoComponent implements OnInit {
    @Input() operaciones: DTOParOperacionPresupuestoComponent[] = [];
    @Output() operacionesACobrar: DTOParOperacionPresupuestoComponent[] = []
    @ViewChildren('operacion') children: QueryList<OperacionPrecioComponent>;
    constructor(private presupuestosService: PresupuestosService) {
    }

    ngOnInit() {
    }

    elegirOperacion(operacion: DTOParOperacionPresupuestoComponent, elegido: boolean) {

        if (!this.operacionesACobrar.some((x) =>
            x === operacion
        ) && elegido
        ) {
            this.operacionesACobrar.push(operacion);
        } else {
            this.operacionesACobrar = this.operacionesACobrar.filter((obj) => obj !== operacion);
        }

    }

    getOperacionesACobrar(): CobranzaOperacion[] {
        const listaOperacionesAcobrar: CobranzaOperacion[] = [];
        this.children.forEach((operacionPrecioComponent) => {
            if (operacionPrecioComponent.getSeleccionado()) {
                listaOperacionesAcobrar.push(operacionPrecioComponent.getOperacionAcobrar());
            }
        })
        return listaOperacionesAcobrar;
    }

}
