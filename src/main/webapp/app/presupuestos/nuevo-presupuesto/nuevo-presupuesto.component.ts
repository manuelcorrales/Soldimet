import { Component, OnInit, Output, Input, EventEmitter } from '@angular/core';
import { DetallePresupuesto } from "../../entities/detalle-presupuesto/detalle-presupuesto.model";
import { TipoParteMotor } from "../../entities/tipo-parte-motor/tipo-parte-motor.model";
import { Cliente } from "../../entities/cliente/cliente.model";
import { DTODatosMotorComponent } from '../../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { PresupuestosService } from '../presupuestos.service';
import { DTOParOperacionPresupuestoComponent } from '../../dto/dto-presupuesto-cabecera/DTOParOperacionPresupuesto';

@Component({
    selector: 'jhi-nuevo-presupuesto',
    templateUrl: './nuevo-presupuesto.component.html',
    styles: []
})
export class NuevoPresupuestoComponent implements OnInit {


    cliente: Cliente;

    detallesPresupuestos: DetallePresupuesto[] = [];
    @Output() operaciones: DTOParOperacionPresupuestoComponent[] = [];

    constructor(private presupuestosService: PresupuestosService) {
    }

    ngOnInit() {

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
                    console.log("responde la busqueda de operaciones y precios")
                    console.log(result)
                }
            );


        }


    }

    recibirCliente($event: Cliente) {
        this.cliente = $event;
    }
}
