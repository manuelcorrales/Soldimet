import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IBanco } from '../banco.model';
import { BancoService } from '../service/banco.service';

@Component({
  templateUrl: './banco-delete-dialog.component.html',
})
export class BancoDeleteDialogComponent {
  banco?: IBanco;

  constructor(protected bancoService: BancoService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.bancoService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
