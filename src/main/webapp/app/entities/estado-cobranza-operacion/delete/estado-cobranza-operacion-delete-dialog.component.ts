import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoCobranzaOperacion } from '../estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from '../service/estado-cobranza-operacion.service';

@Component({
  templateUrl: './estado-cobranza-operacion-delete-dialog.component.html',
})
export class EstadoCobranzaOperacionDeleteDialogComponent {
  estadoCobranzaOperacion?: IEstadoCobranzaOperacion;

  constructor(protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoCobranzaOperacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
