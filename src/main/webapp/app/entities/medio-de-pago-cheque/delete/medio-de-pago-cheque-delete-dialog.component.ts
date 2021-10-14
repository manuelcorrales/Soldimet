import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedioDePagoCheque } from '../medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from '../service/medio-de-pago-cheque.service';

@Component({
  templateUrl: './medio-de-pago-cheque-delete-dialog.component.html',
})
export class MedioDePagoChequeDeleteDialogComponent {
  medioDePagoCheque?: IMedioDePagoCheque;

  constructor(protected medioDePagoChequeService: MedioDePagoChequeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medioDePagoChequeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
