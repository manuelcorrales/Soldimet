import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICobranzaRepuesto } from '../cobranza-repuesto.model';
import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';

@Component({
  templateUrl: './cobranza-repuesto-delete-dialog.component.html',
})
export class CobranzaRepuestoDeleteDialogComponent {
  cobranzaRepuesto?: ICobranzaRepuesto;

  constructor(protected cobranzaRepuestoService: CobranzaRepuestoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cobranzaRepuestoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
