import { Component, OnInit, Output, Input, ViewChildren, QueryList } from '@angular/core';
import { PresupuestosService } from '../../../../presupuestos.service';
import { CobranzaRepuesto } from '../../../../../entities/cobranza-repuesto';
import { RepuestoPrecioComponent } from './repuesto_precio/repuesto-precio.component';
import { TipoRepuesto } from '../../../../../entities/tipo-repuesto';

@Component({
    selector: 'jhi-repuestos-nuevopresupuesto',
    templateUrl: './repuestos-nuevopresupuesto.component.html',
    styles: []
})
export class RepuestosNuevopresupuestoComponent implements OnInit {

    @Input() repuestos: TipoRepuesto[] = [];
    @Output() repuestosACobrar: TipoRepuesto[] = [];
    @ViewChildren('repuesto') children: QueryList<RepuestoPrecioComponent>;
    constructor(private _presupuestoService: PresupuestosService) { }

    ngOnInit() {
        this._presupuestoService.buscarRepuestos().subscribe((repuestos) => {
            this.repuestos.push(...repuestos);
            this.repuestos = repuestos;
        })
    }

    elegirRepuesto(repuesto: TipoRepuesto, elegido: boolean) {

        if (!this.repuestosACobrar.some((x) =>
            x === repuesto
        ) && elegido
        ) {
            this.repuestosACobrar.push(repuesto);
        } else {
            this.repuestosACobrar = this.repuestosACobrar.filter((obj) => obj !== repuesto);
        }

    }

    getRepuestosACobrar(): CobranzaRepuesto[] {
        const listaRepuestosAcobrar: CobranzaRepuesto[] = [];
        this.children.forEach((repuestoPrecioComponent) => {
            if (repuestoPrecioComponent.getSeleccionado()) {
                listaRepuestosAcobrar.push(repuestoPrecioComponent.getArticuloAcobrar());
            }
        });
        return listaRepuestosAcobrar;
    }

}
