import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IMovimientoPedido } from '../movimiento-pedido.model';

@Component({
  selector: 'jhi-movimiento-pedido-detail',
  templateUrl: './movimiento-pedido-detail.component.html',
})
export class MovimientoPedidoDetailComponent implements OnInit {
  movimientoPedido: IMovimientoPedido | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoPedido }) => {
      this.movimientoPedido = movimientoPedido;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
