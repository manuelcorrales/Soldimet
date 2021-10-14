import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICostoRepuesto } from '../costo-repuesto.model';
import { CostoRepuestoService } from '../service/costo-repuesto.service';

@Component({
  templateUrl: './costo-repuesto-delete-dialog.component.html',
})
export class CostoRepuestoDeleteDialogComponent {
  costoRepuesto?: ICostoRepuesto;

  constructor(protected costoRepuestoService: CostoRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.costoRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
