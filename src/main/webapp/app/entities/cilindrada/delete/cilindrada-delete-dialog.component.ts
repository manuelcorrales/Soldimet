import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICilindrada } from '../cilindrada.model';
import { CilindradaService } from '../service/cilindrada.service';

@Component({
  templateUrl: './cilindrada-delete-dialog.component.html',
})
export class CilindradaDeleteDialogComponent {
  cilindrada?: ICilindrada;

  constructor(protected cilindradaService: CilindradaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cilindradaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
