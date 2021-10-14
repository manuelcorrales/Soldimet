import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMedidaArticulo } from '../medida-articulo.model';
import { MedidaArticuloService } from '../service/medida-articulo.service';

@Component({
  templateUrl: './medida-articulo-delete-dialog.component.html',
})
export class MedidaArticuloDeleteDialogComponent {
  medidaArticulo?: IMedidaArticulo;

  constructor(protected medidaArticuloService: MedidaArticuloService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.medidaArticuloService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
