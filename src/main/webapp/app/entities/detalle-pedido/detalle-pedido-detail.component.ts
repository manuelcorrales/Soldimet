import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';

@Component({
  selector: 'jhi-detalle-pedido-detail',
  templateUrl: './detalle-pedido-detail.component.html'
})
export class DetallePedidoDetailComponent implements OnInit {
  detallePedido: IDetallePedido;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.detallePedido = detallePedido;
    });
  }

  previousState() {
    window.history.back();
  }
}
