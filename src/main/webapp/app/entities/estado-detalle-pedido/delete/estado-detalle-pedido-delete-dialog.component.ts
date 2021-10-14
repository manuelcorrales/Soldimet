import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoDetallePedido } from '../estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';

@Component({
  templateUrl: './estado-detalle-pedido-delete-dialog.component.html',
})
export class EstadoDetallePedidoDeleteDialogComponent {
  estadoDetallePedido?: IEstadoDetallePedido;

  constructor(protected estadoDetallePedidoService: EstadoDetallePedidoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoDetallePedidoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
