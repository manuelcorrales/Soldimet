import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { IDocumentationType } from '../documentation-type.model';
import { DocumentationTypeService } from '../service/documentation-type.service';
import { DocumentationTypeDeleteDialogComponent } from '../delete/documentation-type-delete-dialog.component';

@Component({
  selector: 'jhi-documentation-type',
  templateUrl: './documentation-type.component.html',
})
export class DocumentationTypeComponent implements OnInit {
  documentationTypes?: IDocumentationType[];
  isLoading = false;

  constructor(protected documentationTypeService: DocumentationTypeService, protected modalService: NgbModal) {}

  loadAll(): void {
    this.isLoading = true;

    this.documentationTypeService.query().subscribe(
      (res: HttpResponse<IDocumentationType[]>) => {
        this.isLoading = false;
        this.documentationTypes = res.body ?? [];
      },
      () => {
        this.isLoading = false;
      }
    );
  }

  ngOnInit(): void {
    this.loadAll();
  }

  trackId(index: number, item: IDocumentationType): number {
    return item.id!;
  }

  delete(documentationType: IDocumentationType): void {
    const modalRef = this.modalService.open(DocumentationTypeDeleteDialogComponent, { size: 'lg', backdrop: 'static' });
    modalRef.componentInstance.documentationType = documentationType;
    // unsubscribe not needed because closed completes on modal close
    modalRef.closed.subscribe(reason => {
      if (reason === 'deleted') {
        this.loadAll();
      }
    });
  }
}
