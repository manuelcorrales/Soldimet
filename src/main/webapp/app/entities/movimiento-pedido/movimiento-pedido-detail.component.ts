import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';

@Component({
    selector: 'jhi-movimiento-pedido-detail',
    templateUrl: './movimiento-pedido-detail.component.html'
})
export class MovimientoPedidoDetailComponent implements OnInit {
    movimientoPedido: IMovimientoPedido;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movimientoPedido }) => {
            this.movimientoPedido = movimientoPedido;
        });
    }

    previousState() {
        window.history.back();
    }
}
