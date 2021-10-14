import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';

@Component({
  templateUrl: './lista-precio-rectificacion-cram-delete-dialog.component.html',
})
export class ListaPrecioRectificacionCRAMDeleteDialogComponent {
  listaPrecioRectificacionCRAM?: IListaPrecioRectificacionCRAM;

  constructor(protected listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.listaPrecioRectificacionCRAMService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
