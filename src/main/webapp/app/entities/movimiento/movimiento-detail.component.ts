import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimiento } from 'app/shared/model/movimiento.model';

@Component({
    selector: 'jhi-movimiento-detail',
    templateUrl: './movimiento-detail.component.html'
})
export class MovimientoDetailComponent implements OnInit {
    movimiento: IMovimiento;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movimiento }) => {
            this.movimiento = movimiento;
        });
    }

    previousState() {
        window.history.back();
    }
}
