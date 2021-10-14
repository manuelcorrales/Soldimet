import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from '../service/costo-repuesto-proveedor.service';

@Component({
  templateUrl: './costo-repuesto-proveedor-delete-dialog.component.html',
})
export class CostoRepuestoProveedorDeleteDialogComponent {
  costoRepuestoProveedor?: ICostoRepuestoProveedor;

  constructor(protected costoRepuestoProveedorService: CostoRepuestoProveedorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.costoRepuestoProveedorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
