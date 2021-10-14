import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoMovimiento } from '../estado-movimiento.model';
import { EstadoMovimientoService } from '../service/estado-movimiento.service';

@Component({
  templateUrl: './estado-movimiento-delete-dialog.component.html',
})
export class EstadoMovimientoDeleteDialogComponent {
  estadoMovimiento?: IEstadoMovimiento;

  constructor(protected estadoMovimientoService: EstadoMovimientoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoMovimientoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
