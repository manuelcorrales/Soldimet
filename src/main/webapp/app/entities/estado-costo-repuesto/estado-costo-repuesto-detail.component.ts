import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';

@Component({
    selector: 'jhi-estado-costo-repuesto-detail',
    templateUrl: './estado-costo-repuesto-detail.component.html'
})
export class EstadoCostoRepuestoDetailComponent implements OnInit {
    estadoCostoRepuesto: IEstadoCostoRepuesto;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
            this.estadoCostoRepuesto = estadoCostoRepuesto;
        });
    }

    previousState() {
        window.history.back();
    }
}
