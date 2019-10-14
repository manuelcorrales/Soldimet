import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';

@Component({
  selector: 'jhi-estado-pedido-repuesto-detail',
  templateUrl: './estado-pedido-repuesto-detail.component.html'
})
export class EstadoPedidoRepuestoDetailComponent implements OnInit {
  estadoPedidoRepuesto: IEstadoPedidoRepuesto;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ estadoPedidoRepuesto }) => {
      this.estadoPedidoRepuesto = estadoPedidoRepuesto;
    });
  }

  previousState() {
    window.history.back();
  }
}
