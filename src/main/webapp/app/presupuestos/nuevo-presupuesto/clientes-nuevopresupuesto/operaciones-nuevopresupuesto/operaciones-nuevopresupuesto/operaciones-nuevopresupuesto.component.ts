import { Component, Input, Output, OnInit } from '@angular/core';
import { DetallePresupuesto } from '../../../../../entities/detalle-presupuesto/detalle-presupuesto.model';
import { DTOParOperacionPresupuestoComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';
import { PresupuestosService } from '../../../../presupuestos.service';
import { DTODatosMotorComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { CobranzaOperacion } from '../../../../../entities/cobranza-operacion';
import { BaseEntity } from './../../../../../shared';

@Component({
    selector: 'jhi-operaciones-nuevopresupuesto',
    templateUrl: './operaciones-nuevopresupuesto.component.html',
    styles: []
})
export class OperacionesNuevopresupuestoComponent implements OnInit {
    detalles: DetallePresupuesto[] = [];
    @Input() operaciones: DTOParOperacionPresupuestoComponent[] = [];
    @Output() operacionesACobrar: CobranzaOperacion[] = []


    constructor(private presupuestosService: PresupuestosService) {
    }

    ngOnInit() {
    }

    elegirOperacion(operacion: DTOParOperacionPresupuestoComponent, elegido: boolean) {

        let nuevaOperacionACobrar: CobranzaOperacion = new CobranzaOperacion();
        nuevaOperacionACobrar.cobranzaOperacion = operacion.costoOperacion;
        nuevaOperacionACobrar.operacion = operacion.operacionID as BaseEntity;
        if (!this.operacionesACobrar.some(x =>
            x === nuevaOperacionACobrar
        ) && elegido
        ) {
            this.operacionesACobrar.push(nuevaOperacionACobrar);
        } else {
            this.operacionesACobrar = this.operacionesACobrar.filter(obj => obj !== nuevaOperacionACobrar);
        }

    }


}
