import { Component, OnInit, Output, Input, EventEmitter, ViewChild } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DetallePresupuesto } from '../../entities/detalle-presupuesto/detalle-presupuesto.model';
import { TipoParteMotor } from '../../entities/tipo-parte-motor/tipo-parte-motor.model';
import { Cliente } from '../../entities/cliente/cliente.model';
import { DTODatosMotorComponent } from '../../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { PresupuestosService } from '../presupuestos.service';
import { DTOParOperacionPresupuestoComponent } from '../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';
import { Presupuesto, PresupuestoService } from '../../entities/presupuesto';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Operacion } from '../../entities/operacion';
import { ClientesNuevopresupuestoComponent } from './clientes-nuevopresupuesto/clientes-nuevopresupuesto/clientes-nuevopresupuesto.component';

@Component({
    selector: 'jhi-nuevo-presupuesto',
    templateUrl: './nuevo-presupuesto.component.html',
    styles: []
})
export class NuevoPresupuestoComponent implements OnInit {

    presupuesto: Presupuesto;
    detallesPresupuestos: DetallePresupuesto[] = [];
    operaciones: DTOParOperacionPresupuestoComponent[] = [];
    @ViewChild('cliente')clientesComponent: ClientesNuevopresupuestoComponent;

    private subscription: Subscription;
    private eventSubscriber: Subscription;

    constructor(private presupuestosService: PresupuestosService,
                private eventManager: JhiEventManager,
                private presupuestoService: PresupuestoService,
                private route: ActivatedRoute,
               ) {
    }

    ngOnInit() {
        this.consultarPresupuesto();
    }

    consultarPresupuesto() {
        this.subscription = this.route.params.subscribe((params) => {
            if ( params['id']) {
                this.load(params['id']);
                this.registerChangeInPresupuestos();
            }else {
                this.presupuesto = new Presupuesto();
            }
        });

    }

    load(id) {
        this.presupuestoService.find(id).subscribe((presupuesto) => {
            this.presupuesto = presupuesto;
        });
    }

    registerChangeInPresupuestos() {
        this.eventSubscriber = this.eventManager.subscribe(
            'presupuestoListModification',
            (response) => this.load(this.presupuesto.id)
        );
    }

    guardarPresupuesto() {
        // Busco el cliente
        this.presupuesto.cliente = this.clientesComponent.getCliente();
        // Busco los datos del motor
        this.presupuesto.detallePresupuestos = this.detallesPresupuestos;
        // Busco las operaciones
        // busco los repuestos
    }

    @Input()
    recibirDetalle(detalle: DetallePresupuesto) {

        const tipoParteMotor: TipoParteMotor = detalle.tipoParteMotor;
        let detalleNuevo = true;
        this.detallesPresupuestos.forEach((detallePresupuestoCreado) => {
            if (detallePresupuestoCreado.tipoParteMotor === tipoParteMotor) {
                detalleNuevo = false;
            }
        });
        if (detalleNuevo) {
            this.detallesPresupuestos.push(detalle);
            const dto: DTODatosMotorComponent = new DTODatosMotorComponent();
            dto.idAplicacion = detalle.aplicacion.id;
            dto.idCilindrada = detalle.cilindrada.id;
            dto.idMotor = detalle.motor.id;
            dto.idTiposPartesMotores = detalle.tipoParteMotor.id;
            this.presupuestosService.findOperacionesPresupuesto(dto).subscribe(
                (result) => {
                    this.operaciones.push(...result);
                }
            );

        }else {
            //eliminar las operaciones de la lista
        }

    }

}
