import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPedidoRepuesto } from '../pedido-repuesto.model';

@Component({
  selector: 'jhi-pedido-repuesto-detail',
  templateUrl: './pedido-repuesto-detail.component.html',
})
export class PedidoRepuestoDetailComponent implements OnInit {
  pedidoRepuesto: IPedidoRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ pedidoRepuesto }) => {
      this.pedidoRepuesto = pedidoRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
