import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoOperacion } from '../estado-operacion.model';
import { EstadoOperacionService } from '../service/estado-operacion.service';

@Component({
  templateUrl: './estado-operacion-delete-dialog.component.html',
})
export class EstadoOperacionDeleteDialogComponent {
  estadoOperacion?: IEstadoOperacion;

  constructor(protected estadoOperacionService: EstadoOperacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoOperacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
