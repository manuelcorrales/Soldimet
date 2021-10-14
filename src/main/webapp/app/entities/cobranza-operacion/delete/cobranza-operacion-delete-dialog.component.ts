import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ICobranzaOperacion } from '../cobranza-operacion.model';
import { CobranzaOperacionService } from '../service/cobranza-operacion.service';

@Component({
  templateUrl: './cobranza-operacion-delete-dialog.component.html',
})
export class CobranzaOperacionDeleteDialogComponent {
  cobranzaOperacion?: ICobranzaOperacion;

  constructor(protected cobranzaOperacionService: CobranzaOperacionService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.cobranzaOperacionService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
