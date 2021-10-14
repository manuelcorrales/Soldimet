import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICategoriaPago } from '../categoria-pago.model';
import { CategoriaPagoService } from '../service/categoria-pago.service';

@Component({
  templateUrl: './categoria-pago-delete-dialog.component.html',
})
export class CategoriaPagoDeleteDialogComponent {
  categoriaPago?: ICategoriaPago;

  constructor(protected categoriaPagoService: CategoriaPagoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.categoriaPagoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
