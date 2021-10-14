import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDetallePresupuesto } from '../detalle-presupuesto.model';
import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';

@Component({
  templateUrl: './detalle-presupuesto-delete-dialog.component.html',
})
export class DetallePresupuestoDeleteDialogComponent {
  detallePresupuesto?: IDetallePresupuesto;

  constructor(protected detallePresupuestoService: DetallePresupuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.detallePresupuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
