import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoMovimiento } from 'app/shared/model/estado-movimiento.model';

@Component({
    selector: 'jhi-estado-movimiento-detail',
    templateUrl: './estado-movimiento-detail.component.html'
})
export class EstadoMovimientoDetailComponent implements OnInit {
    estadoMovimiento: IEstadoMovimiento;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoMovimiento }) => {
            this.estadoMovimiento = estadoMovimiento;
        });
    }

    previousState() {
        window.history.back();
    }
}
