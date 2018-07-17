
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Cilindrada } from '../../../../entities/cilindrada/cilindrada.model';
import { Motor } from '../../../../entities/motor/motor.model';
import { Aplicacion } from '../../../../entities/aplicacion/aplicacion.model';
import { TipoParteMotor } from '../../../../entities/tipo-parte-motor/tipo-parte-motor.model';
import { PresupuestosService } from '../../../presupuestos.service';
import { DetallePresupuesto } from '../../../../entities/detalle-presupuesto/detalle-presupuesto.model';
import { JhiEventManager } from 'ng-jhipster';
import { DetallePresupuestoService } from '../../../../entities/detalle-presupuesto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'jhi-motor-nuevo-presupuesto',
    templateUrl: './motor-nuevo-presupuesto.component.html',
    styles: []
})
export class MotorNuevoPresupuestoComponent implements OnInit {

    cilindradas: Cilindrada[] = [];
    motores: Motor[] = [];
    aplicaciones: Aplicacion[];
    tiposPartesMotores: TipoParteMotor[] = [];

    motor: Motor;
    aplicacion: Aplicacion;
    cilindradaElegida: Cilindrada;
    detalleCreado = false;

    private subscription: Subscription;
    private eventSubscriber: Subscription;
    @Output() eventoDetallePresupuesto = new EventEmitter<DetallePresupuesto>();

    constructor(private _presupuestosService: PresupuestosService,
        private eventManager: JhiEventManager,
        private detalleService: DetallePresupuestoService,
        private route: ActivatedRoute,
    ) {

    }

    ngOnInit() {
        this.motores = this._presupuestosService.buscarMotores();
        this.cilindradas = this._presupuestosService.buscarCilindradas();
        this.tiposPartesMotores = this._presupuestosService.buscarTiposPartes();
    }

    buscarAplicaciones() {
        this._presupuestosService.findAplicacionesPorMotor(this.motor).subscribe((datos) => {
            this.aplicaciones = datos;
        });
    }

    crearDetalle(tipoParteMotor: TipoParteMotor, valor: boolean) {
        this.detalleCreado = true;
        const detallePresupuesto = new DetallePresupuesto();
        detallePresupuesto.tipoParteMotor = tipoParteMotor;
        detallePresupuesto.motor = this.motor;
        detallePresupuesto.cilindrada = this.cilindradaElegida;
        detallePresupuesto.aplicacion = this.aplicacion;
        this.eventoDetallePresupuesto.emit(detallePresupuesto);

    }
}
