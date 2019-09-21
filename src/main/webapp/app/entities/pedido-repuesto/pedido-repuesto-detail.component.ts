import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

@Component({
  selector: 'jhi-pedido-repuesto-detail',
  templateUrl: './pedido-repuesto-detail.component.html'
})
export class PedidoRepuestoDetailComponent implements OnInit {
  pedidoRepuesto: IPedidoRepuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ pedidoRepuesto }) => {
      this.pedidoRepuesto = pedidoRepuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}
