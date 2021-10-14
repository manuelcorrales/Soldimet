import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetallePedido } from '../detalle-pedido.model';

@Component({
  selector: 'jhi-detalle-pedido-detail',
  templateUrl: './detalle-pedido-detail.component.html',
})
export class DetallePedidoDetailComponent implements OnInit {
  detallePedido: IDetallePedido | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.detallePedido = detallePedido;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
