import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPresupuesto } from '../estado-presupuesto.model';
import { EstadoPresupuestoService } from '../service/estado-presupuesto.service';

@Component({
  templateUrl: './estado-presupuesto-delete-dialog.component.html',
})
export class EstadoPresupuestoDeleteDialogComponent {
  estadoPresupuesto?: IEstadoPresupuesto;

  constructor(protected estadoPresupuestoService: EstadoPresupuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoPresupuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
