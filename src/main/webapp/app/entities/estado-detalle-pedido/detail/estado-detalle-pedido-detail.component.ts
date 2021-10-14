import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoDetallePedido } from '../estado-detalle-pedido.model';

@Component({
  selector: 'jhi-estado-detalle-pedido-detail',
  templateUrl: './estado-detalle-pedido-detail.component.html',
})
export class EstadoDetallePedidoDetailComponent implements OnInit {
  estadoDetallePedido: IEstadoDetallePedido | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoDetallePedido }) => {
      this.estadoDetallePedido = estadoDetallePedido;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
