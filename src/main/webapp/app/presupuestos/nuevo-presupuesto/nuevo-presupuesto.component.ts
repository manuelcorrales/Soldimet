import {Component, OnInit, Output} from '@angular/core';
import {DetallePresupuesto} from "../../entities/detalle-presupuesto/detalle-presupuesto.model";
import {TipoParteMotor} from "../../entities/tipo-parte-motor/tipo-parte-motor.model";
import {Cliente} from "../../entities/cliente/cliente.model";

@Component({
    selector: 'jhi-nuevo-presupuesto',
    templateUrl: './nuevo-presupuesto.component.html',
    styles: []
})
export class NuevoPresupuestoComponent implements OnInit {


    cliente: Cliente;

    @Output() detallesPresupuestos: DetallePresupuesto[] = [];

    constructor() {
    }

    ngOnInit() {

    }


    guardarPresupuesto() {

    }

    recibirDetalle($event: DetallePresupuesto) {
        var tipoParteMotor: TipoParteMotor = $event.tipoParteMotor;
        var detalleNuevo = true;
        this.detallesPresupuestos.forEach((detallePresupuestoCreado) => {
            if (detallePresupuestoCreado.tipoParteMotor === tipoParteMotor) {
                detalleNuevo = false;
            }
        });
        if (detalleNuevo) {
            this.detallesPresupuestos.push($event);
        }
    }

    recibirCliente($event: Cliente) {
        this.cliente = $event;
    }
}
