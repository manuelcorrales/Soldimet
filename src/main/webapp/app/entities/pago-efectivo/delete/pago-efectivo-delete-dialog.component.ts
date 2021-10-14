import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagoEfectivo } from '../pago-efectivo.model';
import { PagoEfectivoService } from '../service/pago-efectivo.service';

@Component({
  templateUrl: './pago-efectivo-delete-dialog.component.html',
})
export class PagoEfectivoDeleteDialogComponent {
  pagoEfectivo?: IPagoEfectivo;

  constructor(protected pagoEfectivoService: PagoEfectivoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagoEfectivoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
