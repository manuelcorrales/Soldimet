import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoRepuesto } from '../tipo-repuesto.model';
import { TipoRepuestoService } from '../service/tipo-repuesto.service';

@Component({
  templateUrl: './tipo-repuesto-delete-dialog.component.html',
})
export class TipoRepuestoDeleteDialogComponent {
  tipoRepuesto?: ITipoRepuesto;

  constructor(protected tipoRepuestoService: TipoRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
