import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from '../service/estado-pedido-repuesto.service';

@Component({
  templateUrl: './estado-pedido-repuesto-delete-dialog.component.html',
})
export class EstadoPedidoRepuestoDeleteDialogComponent {
  estadoPedidoRepuesto?: IEstadoPedidoRepuesto;

  constructor(protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoPedidoRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
