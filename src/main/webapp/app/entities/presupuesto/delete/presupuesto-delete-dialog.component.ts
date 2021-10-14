import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPresupuesto } from '../presupuesto.model';
import { PresupuestoService } from '../service/presupuesto.service';

@Component({
  templateUrl: './presupuesto-delete-dialog.component.html',
})
export class PresupuestoDeleteDialogComponent {
  presupuesto?: IPresupuesto;

  constructor(protected presupuestoService: PresupuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.presupuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
