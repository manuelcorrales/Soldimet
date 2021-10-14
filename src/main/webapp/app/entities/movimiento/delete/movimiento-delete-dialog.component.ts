import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimiento } from '../movimiento.model';
import { MovimientoService } from '../service/movimiento.service';

@Component({
  templateUrl: './movimiento-delete-dialog.component.html',
})
export class MovimientoDeleteDialogComponent {
  movimiento?: IMovimiento;

  constructor(protected movimientoService: MovimientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
