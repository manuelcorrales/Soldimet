import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoPedido } from '../movimiento-pedido.model';
import { MovimientoPedidoService } from '../service/movimiento-pedido.service';

@Component({
  templateUrl: './movimiento-pedido-delete-dialog.component.html',
})
export class MovimientoPedidoDeleteDialogComponent {
  movimientoPedido?: IMovimientoPedido;

  constructor(protected movimientoPedidoService: MovimientoPedidoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientoPedidoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
