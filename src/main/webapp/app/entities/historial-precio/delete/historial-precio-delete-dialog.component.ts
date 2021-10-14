import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IHistorialPrecio } from '../historial-precio.model';
import { HistorialPrecioService } from '../service/historial-precio.service';

@Component({
  templateUrl: './historial-precio-delete-dialog.component.html',
})
export class HistorialPrecioDeleteDialogComponent {
  historialPrecio?: IHistorialPrecio;

  constructor(protected historialPrecioService: HistorialPrecioService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.historialPrecioService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
