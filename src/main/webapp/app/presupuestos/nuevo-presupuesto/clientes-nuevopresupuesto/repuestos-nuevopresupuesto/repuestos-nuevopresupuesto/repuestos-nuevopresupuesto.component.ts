import { Component, OnInit, Output, Input, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { PresupuestosService } from '../../../../presupuestos.service';
import { CobranzaRepuesto } from '../../../../../entities/cobranza-repuesto';
import { RepuestoPrecioComponent } from './repuesto_precio/repuesto-precio.component';
import { TipoRepuesto } from '../../../../../entities/tipo-repuesto';
import { DetallePresupuesto } from '../../../../../entities/detalle-presupuesto';

@Component({
    selector: 'jhi-repuestos-nuevopresupuesto',
    templateUrl: './repuestos-nuevopresupuesto.component.html',
    styles: []
})
export class RepuestosNuevopresupuestoComponent implements OnInit {

    @Input() detalle: DetallePresupuesto;
    repuestos: TipoRepuesto[] = [];
    total = 0;
    @ViewChildren('repuestoComponents') children: QueryList<RepuestoPrecioComponent>;
    @Output() eventoTotalRepuestos = new EventEmitter<number>();
    constructor(private _presupuestoService: PresupuestosService) { }

    ngOnInit() {
        this.update()
    }

    update() {
        this._presupuestoService.buscarRepuestos(this.detalle).subscribe((repuestos: TipoRepuesto[]) => {
            this.repuestos = repuestos
        })
    }

    elegirRepuesto(repuesto: TipoRepuesto, elegido: boolean) {

        if (!this.detalle.cobranzaRepuestos.some((x) =>
            x === repuesto
        ) && elegido
        ) {
            this.detalle.cobranzaRepuestos.push(repuesto);
        } else {
            this.detalle.cobranzaRepuestos = this.detalle.cobranzaRepuestos.filter((obj) => obj !== repuesto);
        }

    }

    completarDetalle() {
        const cobranzaRepuesto: CobranzaRepuesto[] = [];
        this.children.forEach((componente) => {
            if (componente.seleccionado) {
                cobranzaRepuesto.push(componente.getArticuloAcobrar());
            }
        })
        this.detalle.cobranzaRepuestos = cobranzaRepuesto;
    }

    getDetalle(): DetallePresupuesto {
        return this.detalle;
    }

    @Input()
    cambioTotalRepuestos() {
        this.total = 0
        this.children.forEach((componente) => {
            this.total = this.total + componente.getPrecio()
        })
        this.eventoTotalRepuestos.emit();
    }

}
