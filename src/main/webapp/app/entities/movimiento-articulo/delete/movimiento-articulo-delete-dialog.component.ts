import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMovimientoArticulo } from '../movimiento-articulo.model';
import { MovimientoArticuloService } from '../service/movimiento-articulo.service';

@Component({
  templateUrl: './movimiento-articulo-delete-dialog.component.html',
})
export class MovimientoArticuloDeleteDialogComponent {
  movimientoArticulo?: IMovimientoArticulo;

  constructor(protected movimientoArticuloService: MovimientoArticuloService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.movimientoArticuloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
