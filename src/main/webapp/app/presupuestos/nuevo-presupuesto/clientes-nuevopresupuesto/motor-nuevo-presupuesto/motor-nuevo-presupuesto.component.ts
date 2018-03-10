import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {Cilindrada} from "../../../../entities/cilindrada/cilindrada.model";
import {Motor} from "../../../../entities/motor/motor.model";
import {Aplicacion} from "../../../../entities/aplicacion/aplicacion.model";
import {TipoParteMotor} from "../../../../entities/tipo-parte-motor/tipo-parte-motor.model";
import {PresupuestosService} from "../../../presupuestos.service";
import {DetallePresupuesto} from "../../../../entities/detalle-presupuesto/detalle-presupuesto.model";

@Component({
    selector: 'jhi-motor-nuevo-presupuesto',
    templateUrl: './motor-nuevo-presupuesto.component.html',
    styles: []
})
export class MotorNuevoPresupuestoComponent implements OnInit {

    cilindradas: Cilindrada[] = [];
    motores: Motor[] = [];
    motor: Motor;
    aplicacion: Aplicacion;
    cilindrada: Cilindrada;
    aplicaciones: Aplicacion[];
    tiposPartesMotores: TipoParteMotor[] = [];

    @Output() eventoDetallePresupuesto = new EventEmitter<DetallePresupuesto>();

    constructor(private _presupuestosService: PresupuestosService,) {
    }

    ngOnInit() {

        this.motores = this._presupuestosService.buscarMotores();
        this.cilindradas = this._presupuestosService.buscarCilindradas();
        this.tiposPartesMotores = this._presupuestosService.buscarTiposPartes();
    }

    trackMotorById(index: number, item: Motor): number {
        return item.id;
    }

    buscarAplicaciones() {
        /*
        for (let i = 0; this.motores.length > i; i++) {
            if (this.motores[i].id == this.motorID) {

                this.aplicaciones = this._presupuestosService.findAplicacionesPorMotor(this.motores[i]);
            }
        }
*/
        this._presupuestosService.findAplicacionesPorMotor(this.motor).subscribe((datos) => {
            this.aplicaciones = datos;
        });
        //this._presupuestosService.findAplicacionesPorMotor(this.motor).subscribe((data) => {
        //    this.aplicaciones = data;

        //});

    }

    crearDetalle(tipoParteMotor: TipoParteMotor, valor: boolean) {

        if (valor) {
            let detallePresupuesto = new DetallePresupuesto();
            detallePresupuesto.tipoParteMotor = tipoParteMotor;
            detallePresupuesto.motor = this.motor;
            detallePresupuesto.cilindrada = this.cilindrada;
            detallePresupuesto.aplicacion = this.aplicacion;

            this.eventoDetallePresupuesto.emit(detallePresupuesto);
        }
    }
}
