import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedioDePagoTarjeta } from '../medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from '../service/medio-de-pago-tarjeta.service';

@Component({
  templateUrl: './medio-de-pago-tarjeta-delete-dialog.component.html',
})
export class MedioDePagoTarjetaDeleteDialogComponent {
  medioDePagoTarjeta?: IMedioDePagoTarjeta;

  constructor(protected medioDePagoTarjetaService: MedioDePagoTarjetaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medioDePagoTarjetaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
