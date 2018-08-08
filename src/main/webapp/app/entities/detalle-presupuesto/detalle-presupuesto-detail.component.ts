import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

@Component({
    selector: 'jhi-detalle-presupuesto-detail',
    templateUrl: './detalle-presupuesto-detail.component.html'
})
export class DetallePresupuestoDetailComponent implements OnInit {
    detallePresupuesto: IDetallePresupuesto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ detallePresupuesto }) => {
            this.detallePresupuesto = detallePresupuesto;
        });
    }

    previousState() {
        window.history.back();
    }
}
