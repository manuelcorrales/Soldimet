import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';

@Component({
  templateUrl: './lista-precio-desde-hasta-delete-dialog.component.html',
})
export class ListaPrecioDesdeHastaDeleteDialogComponent {
  listaPrecioDesdeHasta?: IListaPrecioDesdeHasta;

  constructor(protected listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.listaPrecioDesdeHastaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
