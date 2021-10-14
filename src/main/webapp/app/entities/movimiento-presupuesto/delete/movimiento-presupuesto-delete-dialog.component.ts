import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoPresupuesto } from '../movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';

@Component({
  templateUrl: './movimiento-presupuesto-delete-dialog.component.html',
})
export class MovimientoPresupuestoDeleteDialogComponent {
  movimientoPresupuesto?: IMovimientoPresupuesto;

  constructor(protected movimientoPresupuestoService: MovimientoPresupuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientoPresupuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
