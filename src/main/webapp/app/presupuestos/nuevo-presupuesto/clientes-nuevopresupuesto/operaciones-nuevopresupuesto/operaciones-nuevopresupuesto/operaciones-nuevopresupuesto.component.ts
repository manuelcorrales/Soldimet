import { Component, Input, Output, OnInit, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { DetallePresupuesto } from '../../../../../entities/detalle-presupuesto/detalle-presupuesto.model';
import { PresupuestosService } from '../../../../presupuestos.service';
import { DTODatosMotorComponent } from '../../../../../dto/dto-presupuesto-cabecera/DTODatosMotor';
import { OperacionPrecioComponent } from './operacion_precio/operacion-precio.component';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CobranzaOperacion } from 'app/entities/cobranza-operacion/cobranza-operacion.model';

@Component({
    selector: 'jhi-operaciones-nuevopresupuesto',
    templateUrl: './operaciones-nuevopresupuesto.component.html',
    styles: []
})
export class OperacionesNuevopresupuestoComponent implements OnInit {
    @Input() detalle: DetallePresupuesto;
    operaciones: CostoOperacion[] = [];
    total = 0;
    @ViewChildren('operaciones') children: QueryList<OperacionPrecioComponent>;
    @Output() eventoTotalOperaciones = new EventEmitter<number>();

    constructor(private presupuestosService: PresupuestosService) {}

    ngOnInit() {
        this.update();
    }

    completarDetalle() {
        const cobranzaOperaciones: CobranzaOperacion[] = [];
        this.children.forEach(componente => {
            if (componente.seleccionado) {
                cobranzaOperaciones.push(componente.getOperacionAcobrar());
            }
        });
        this.detalle.cobranzaOperacions = cobranzaOperaciones;
    }

    update() {
        const dto: DTODatosMotorComponent = new DTODatosMotorComponent();
        dto.idAplicacion = this.detalle.aplicacion.id;
        dto.idCilindrada = this.detalle.cilindrada.id;
        dto.idMotor = this.detalle.motor.id;
        dto.idTiposPartesMotores = this.detalle.tipoParteMotor.id;
        this.presupuestosService.findOperacionesPresupuesto(dto).subscribe(result => {
            this.operaciones.push(...result);
        });
    }

    @Input()
    cambioTotalOperaciones() {
        this.total = 0;
        this.children.forEach(componente => {
            this.total = this.total + componente.getPrecio();
        });
        this.eventoTotalOperaciones.emit();
    }
}
