import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IMotor } from '../motor.model';
import { MotorService } from '../service/motor.service';

@Component({
  templateUrl: './motor-delete-dialog.component.html',
})
export class MotorDeleteDialogComponent {
  motor?: IMotor;

  constructor(protected motorService: MotorService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.motorService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
