import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICostoOperacion } from '../costo-operacion.model';
import { CostoOperacionService } from '../service/costo-operacion.service';

@Component({
  templateUrl: './costo-operacion-delete-dialog.component.html',
})
export class CostoOperacionDeleteDialogComponent {
  costoOperacion?: ICostoOperacion;

  constructor(protected costoOperacionService: CostoOperacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.costoOperacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
