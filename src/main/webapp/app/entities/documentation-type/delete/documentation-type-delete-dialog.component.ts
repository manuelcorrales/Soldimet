import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentationType } from '../documentation-type.model';
import { DocumentationTypeService } from '../service/documentation-type.service';

@Component({
  templateUrl: './documentation-type-delete-dialog.component.html',
})
export class DocumentationTypeDeleteDialogComponent {
  documentationType?: IDocumentationType;

  constructor(protected documentationTypeService: DocumentationTypeService, protected activeModal: NgbActiveModal) {}

  cancel(): void {
    this.activeModal.dismiss();
  }

  confirmDelete(id: number): void {
    this.documentationTypeService.delete(id).subscribe(() => {
      this.activeModal.close('deleted');
    });
  }
}
