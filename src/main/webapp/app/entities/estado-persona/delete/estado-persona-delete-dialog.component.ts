import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IEstadoPersona } from '../estado-persona.model';
import { EstadoPersonaService } from '../service/estado-persona.service';

@Component({
  templateUrl: './estado-persona-delete-dialog.component.html',
})
export class EstadoPersonaDeleteDialogComponent {
  estadoPersona?: IEstadoPersona;

  constructor(protected estadoPersonaService: EstadoPersonaService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.estadoPersonaService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
