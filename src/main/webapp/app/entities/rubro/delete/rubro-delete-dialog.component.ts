import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IRubro } from '../rubro.model';
import { RubroService } from '../service/rubro.service';

@Component({
  templateUrl: './rubro-delete-dialog.component.html',
})
export class RubroDeleteDialogComponent {
  rubro?: IRubro;

  constructor(protected rubroService: RubroService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.rubroService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
