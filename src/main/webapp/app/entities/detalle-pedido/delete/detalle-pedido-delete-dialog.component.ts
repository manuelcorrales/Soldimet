import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallePedido } from '../detalle-pedido.model';
import { DetallePedidoService } from '../service/detalle-pedido.service';

@Component({
  templateUrl: './detalle-pedido-delete-dialog.component.html',
})
export class DetallePedidoDeleteDialogComponent {
  detallePedido?: IDetallePedido;

  constructor(protected detallePedidoService: DetallePedidoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detallePedidoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
