import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { ITipoParteMotor } from '../tipo-parte-motor.model';
import { TipoParteMotorService } from '../service/tipo-parte-motor.service';

@Component({
  templateUrl: './tipo-parte-motor-delete-dialog.component.html',
})
export class TipoParteMotorDeleteDialogComponent {
  tipoParteMotor?: ITipoParteMotor;

  constructor(protected tipoParteMotorService: TipoParteMotorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.tipoParteMotorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
