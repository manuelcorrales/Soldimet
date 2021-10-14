import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IAplicacion } from '../aplicacion.model';
import { AplicacionService } from '../service/aplicacion.service';

@Component({
  templateUrl: './aplicacion-delete-dialog.component.html',
})
export class AplicacionDeleteDialogComponent {
  aplicacion?: IAplicacion;

  constructor(protected aplicacionService: AplicacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.aplicacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
