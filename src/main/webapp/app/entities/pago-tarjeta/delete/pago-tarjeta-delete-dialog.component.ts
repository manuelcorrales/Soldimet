import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagoTarjeta } from '../pago-tarjeta.model';
import { PagoTarjetaService } from '../service/pago-tarjeta.service';

@Component({
  templateUrl: './pago-tarjeta-delete-dialog.component.html',
})
export class PagoTarjetaDeleteDialogComponent {
  pagoTarjeta?: IPagoTarjeta;

  constructor(protected pagoTarjetaService: PagoTarjetaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagoTarjetaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
