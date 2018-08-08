import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ITipoMovimiento } from 'app/shared/model/tipo-movimiento.model';

@Component({
    selector: 'jhi-tipo-movimiento-detail',
    templateUrl: './tipo-movimiento-detail.component.html'
})
export class TipoMovimientoDetailComponent implements OnInit {
    tipoMovimiento: ITipoMovimiento;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ tipoMovimiento }) => {
            this.tipoMovimiento = tipoMovimiento;
        });
    }

    previousState() {
        window.history.back();
    }
}
