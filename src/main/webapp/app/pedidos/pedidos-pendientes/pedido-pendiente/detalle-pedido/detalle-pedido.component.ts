import { DetallePedido } from './../../../../entities/detalle-pedido/detalle-pedido.model';
import { IMedidaArticulo } from './../../../../entities/medida-articulo/medida-articulo.model';
import { CostoRepuesto } from './../../../../entities/costo-repuesto/costo-repuesto.model';
import { Component, Input, QueryList, ViewChildren } from '@angular/core';
import { CostoRepuestoComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/costo-repuesto/costo-repuesto.component';

@Component({
  selector: 'jhi-detalle-pedido',
  templateUrl: './detalle-pedido.component.html',
  styles: [],
})
export class DetallePedidoNewComponent {
  @Input()
  detallePedido!: DetallePedido;
  @Input()
  medidas!: IMedidaArticulo[];
  @ViewChildren('costoRepuestoComponent')
  costosRepuestoComponent!: QueryList<CostoRepuestoComponent>;

  constructor() {}

  getOrderedCostoRepuestos() {
    this.detallePedido.costoRepuestos!.sort((a: CostoRepuesto, b: CostoRepuesto) => {
      if (a.tipoRepuesto!.nombreTipoRepuesto! > b.tipoRepuesto!.nombreTipoRepuesto!) {
        return 1;
      } else if (a.tipoRepuesto!.nombreTipoRepuesto! < b.tipoRepuesto!.nombreTipoRepuesto!) {
        return -1;
      } else {
        return 0;
      }
    });
    return this.detallePedido.costoRepuestos!;
  }
}
