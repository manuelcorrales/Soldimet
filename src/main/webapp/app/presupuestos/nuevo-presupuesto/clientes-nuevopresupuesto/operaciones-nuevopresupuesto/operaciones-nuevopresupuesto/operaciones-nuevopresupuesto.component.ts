import {Component, Input, OnInit} from '@angular/core';
import {DetallePresupuesto} from "../../../../../entities/detalle-presupuesto/detalle-presupuesto.model";
import { DTOParOperacionPresupuestoComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';
import { PresupuestosService } from '../../../../presupuestos.service';
import { DTODatosMotorComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTODatosMotor';

@Component({
    selector: 'jhi-operaciones-nuevopresupuesto',
    templateUrl: './operaciones-nuevopresupuesto.component.html',
    styles: []
})
export class OperacionesNuevopresupuestoComponent implements OnInit {
    @Input() operaciones: DTOParOperacionPresupuestoComponent[] = [];

    constructor(private presupuestosService: PresupuestosService) {
    }

    ngOnInit() {
    }




}
