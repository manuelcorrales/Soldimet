import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedioDePago } from '../medio-de-pago.model';
import { MedioDePagoService } from '../service/medio-de-pago.service';

@Component({
  templateUrl: './medio-de-pago-delete-dialog.component.html',
})
export class MedioDePagoDeleteDialogComponent {
  medioDePago?: IMedioDePago;

  constructor(protected medioDePagoService: MedioDePagoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medioDePagoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
