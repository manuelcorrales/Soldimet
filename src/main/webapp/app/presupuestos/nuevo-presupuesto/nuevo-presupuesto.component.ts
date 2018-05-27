import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
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

@Component({
    selector: 'jhi-nuevo-presupuesto',
    templateUrl: './nuevo-presupuesto.component.html',
    styles: []
})
export class NuevoPresupuestoComponent implements OnInit {

    presupuesto: Presupuesto;
    detallesPresupuestos: DetallePresupuesto[] = [];
    operaciones: DTOParOperacionPresupuestoComponent[] = [];

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


    consultarPresupuesto(){
        this.subscription = this.route.params.subscribe((params) => {
            if(params['id']){
                this.load(params['id']);
                this.registerChangeInPresupuestos();
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

    }


    @Input()
    recibirDetalle(detalle: DetallePresupuesto) {

        let tipoParteMotor: TipoParteMotor = detalle.tipoParteMotor;
        var detalleNuevo = true;
        this.detallesPresupuestos.forEach((detallePresupuestoCreado) => {
            if (detallePresupuestoCreado.tipoParteMotor === tipoParteMotor) {
                detalleNuevo = false;
            }
        });
        if (detalleNuevo) {
            this.detallesPresupuestos.push(detalle);
            let dto: DTODatosMotorComponent = new DTODatosMotorComponent();
            dto.idAplicacion = detalle.aplicacion.id;
            dto.idCilindrada = detalle.cilindrada.id;
            dto.idMotor = detalle.motor.id;
            dto.idTiposPartesMotores = detalle.tipoParteMotor.id;
            this.presupuestosService.findOperacionesPresupuesto(dto).subscribe(
                (result) => {
                    this.operaciones.push(...result);
                }
            );


        }else{
            //eliminar las operaciones de la lista
        }


    }

}
