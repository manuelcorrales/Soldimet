import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoArticulo } from '../estado-articulo.model';
import { EstadoArticuloService } from '../service/estado-articulo.service';

@Component({
  templateUrl: './estado-articulo-delete-dialog.component.html',
})
export class EstadoArticuloDeleteDialogComponent {
  estadoArticulo?: IEstadoArticulo;

  constructor(protected estadoArticuloService: EstadoArticuloService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoArticuloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
