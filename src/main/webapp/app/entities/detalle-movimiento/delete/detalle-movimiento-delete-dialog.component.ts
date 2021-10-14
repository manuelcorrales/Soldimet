import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetalleMovimiento } from '../detalle-movimiento.model';
import { DetalleMovimientoService } from '../service/detalle-movimiento.service';

@Component({
  templateUrl: './detalle-movimiento-delete-dialog.component.html',
})
export class DetalleMovimientoDeleteDialogComponent {
  detalleMovimiento?: IDetalleMovimiento;

  constructor(protected detalleMovimientoService: DetalleMovimientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detalleMovimientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
