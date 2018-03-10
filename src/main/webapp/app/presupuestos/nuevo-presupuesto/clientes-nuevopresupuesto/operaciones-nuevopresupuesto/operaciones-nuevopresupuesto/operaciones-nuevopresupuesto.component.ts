import {Component, Input, OnInit} from '@angular/core';
import {DetallePresupuesto} from "../../../../../entities/detalle-presupuesto/detalle-presupuesto.model";

@Component({
    selector: 'jhi-operaciones-nuevopresupuesto',
    templateUrl: './operaciones-nuevopresupuesto.component.html',
    styles: []
})
export class OperacionesNuevopresupuestoComponent implements OnInit {

    @Input() detallesPresupuestos: DetallePresupuesto[];

    constructor() {
    }

    ngOnInit() {
    }

}
