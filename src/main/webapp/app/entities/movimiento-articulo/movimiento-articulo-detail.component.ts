import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';

@Component({
    selector: 'jhi-movimiento-articulo-detail',
    templateUrl: './movimiento-articulo-detail.component.html'
})
export class MovimientoArticuloDetailComponent implements OnInit {
    movimientoArticulo: IMovimientoArticulo;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movimientoArticulo }) => {
            this.movimientoArticulo = movimientoArticulo;
        });
    }

    previousState() {
        window.history.back();
    }
}
