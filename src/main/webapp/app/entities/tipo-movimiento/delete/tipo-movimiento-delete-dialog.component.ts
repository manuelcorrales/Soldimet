import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoMovimiento } from '../tipo-movimiento.model';
import { TipoMovimientoService } from '../service/tipo-movimiento.service';

@Component({
  templateUrl: './tipo-movimiento-delete-dialog.component.html',
})
export class TipoMovimientoDeleteDialogComponent {
  tipoMovimiento?: ITipoMovimiento;

  constructor(protected tipoMovimientoService: TipoMovimientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoMovimientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
