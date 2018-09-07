import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { JhiEventManager } from 'ng-jhipster';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { Motor } from 'app/shared/model/motor.model';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

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

    constructor(
        private _presupuestosService: PresupuestosService,
        private eventManager: JhiEventManager,
        private detalleService: DetallePresupuestoService,
        private route: ActivatedRoute
    ) {}

    ngOnInit() {
        this.motores = this._presupuestosService.buscarMotores();
        this.cilindradas = this._presupuestosService.buscarCilindradas();
        this.tiposPartesMotores = this._presupuestosService.buscarTiposPartes();
    }

    buscarAplicaciones() {
        this._presupuestosService.findAplicacionesPorMotor(this.motor).subscribe(datos => {
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
