import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPedidoRepuesto } from '../pedido-repuesto.model';
import { PedidoRepuestoService } from '../service/pedido-repuesto.service';

@Component({
  templateUrl: './pedido-repuesto-delete-dialog.component.html',
})
export class PedidoRepuestoDeleteDialogComponent {
  pedidoRepuesto?: IPedidoRepuesto;

  constructor(protected pedidoRepuestoService: PedidoRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pedidoRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
