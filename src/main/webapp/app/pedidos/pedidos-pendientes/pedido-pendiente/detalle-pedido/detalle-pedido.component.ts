import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';
import { CostoRepuestoComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/costo-repuesto/costo-repuesto.component';
// import { IArticulo } from 'app/shared/model/articulo.model';
// import { Marca } from 'app/shared/model/marca.model';

@Component({
  selector: 'jhi-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styles: []
})
export class DetallePedidoNewComponent implements OnInit {
  @Input()
  detallePedido: DetallePedido;
  @ViewChildren('costoRepuestoComponent')
  costosRepuestoComponent: QueryList<CostoRepuestoComponent>;

  constructor() {}

  ngOnInit() {}

  getOrderedCostoRepuestos() {
    this.detallePedido.costoRepuestos.sort((a, b) => {
      if (a.tipoRepuesto.nombreTipoRepuesto > b.tipoRepuesto.nombreTipoRepuesto) {
        return 1;
      } else if (a.tipoRepuesto.nombreTipoRepuesto < b.tipoRepuesto.nombreTipoRepuesto) {
        return -1;
      } else {
        return 0;
      }
    });
    return this.detallePedido.costoRepuestos;
  }
}
