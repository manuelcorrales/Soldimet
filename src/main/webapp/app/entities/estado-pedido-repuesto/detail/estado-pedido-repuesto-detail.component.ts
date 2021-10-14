import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';

@Component({
  selector: 'jhi-estado-pedido-repuesto-detail',
  templateUrl: './estado-pedido-repuesto-detail.component.html',
})
export class EstadoPedidoRepuestoDetailComponent implements OnInit {
  estadoPedidoRepuesto: IEstadoPedidoRepuesto | null = null;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPedidoRepuesto }) => {
      this.estadoPedidoRepuesto = estadoPedidoRepuesto;
    });
  }

  previousState(): void {
    window.history.back();
  }
}
