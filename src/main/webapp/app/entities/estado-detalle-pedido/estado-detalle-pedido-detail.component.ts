import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';

@Component({
    selector: 'jhi-estado-detalle-pedido-detail',
    templateUrl: './estado-detalle-pedido-detail.component.html'
})
export class EstadoDetallePedidoDetailComponent implements OnInit {
    estadoDetallePedido: IEstadoDetallePedido;

    constructor(private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoDetallePedido }) => {
            this.estadoDetallePedido = estadoDetallePedido;
        });
    }

    previousState() {
        window.history.back();
    }
}
