import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IPagoCheque } from '../pago-cheque.model';
import { PagoChequeService } from '../service/pago-cheque.service';

@Component({
  templateUrl: './pago-cheque-delete-dialog.component.html',
})
export class PagoChequeDeleteDialogComponent {
  pagoCheque?: IPagoCheque;

  constructor(protected pagoChequeService: PagoChequeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.pagoChequeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
