import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPrecioRepuesto } from '../precio-repuesto.model';
import { PrecioRepuestoService } from '../service/precio-repuesto.service';

@Component({
  templateUrl: './precio-repuesto-delete-dialog.component.html',
})
export class PrecioRepuestoDeleteDialogComponent {
  precioRepuesto?: IPrecioRepuesto;

  constructor(protected precioRepuestoService: PrecioRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.precioRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
