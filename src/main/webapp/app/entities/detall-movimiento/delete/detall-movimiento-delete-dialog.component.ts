import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallMovimiento } from '../detall-movimiento.model';
import { DetallMovimientoService } from '../service/detall-movimiento.service';

@Component({
  templateUrl: './detall-movimiento-delete-dialog.component.html',
})
export class DetallMovimientoDeleteDialogComponent {
  detallMovimiento?: IDetallMovimiento;

  constructor(protected detallMovimientoService: DetallMovimientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detallMovimientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
