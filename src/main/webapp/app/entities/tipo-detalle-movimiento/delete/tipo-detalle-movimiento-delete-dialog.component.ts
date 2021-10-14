import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoDetalleMovimiento } from '../tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from '../service/tipo-detalle-movimiento.service';

@Component({
  templateUrl: './tipo-detalle-movimiento-delete-dialog.component.html',
})
export class TipoDetalleMovimientoDeleteDialogComponent {
  tipoDetalleMovimiento?: ITipoDetalleMovimiento;

  constructor(protected tipoDetalleMovimientoService: TipoDetalleMovimientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoDetalleMovimientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
