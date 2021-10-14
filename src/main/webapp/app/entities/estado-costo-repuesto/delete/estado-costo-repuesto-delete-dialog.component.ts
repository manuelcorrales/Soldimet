import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoCostoRepuesto } from '../estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from '../service/estado-costo-repuesto.service';

@Component({
  templateUrl: './estado-costo-repuesto-delete-dialog.component.html',
})
export class EstadoCostoRepuestoDeleteDialogComponent {
  estadoCostoRepuesto?: IEstadoCostoRepuesto;

  constructor(protected estadoCostoRepuestoService: EstadoCostoRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoCostoRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
