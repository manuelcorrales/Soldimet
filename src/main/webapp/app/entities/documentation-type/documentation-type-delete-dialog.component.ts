import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from './documentation-type.service';

@Component({
    selector: 'jhi-documentation-type-delete-dialog',
    templateUrl: './documentation-type-delete-dialog.component.html'
})
export class DocumentationTypeDeleteDialogComponent {
    documentationType: IDocumentationType;

    constructor(
        private documentationTypeService: DocumentationTypeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.documentationTypeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'documentationTypeListModification',
                content: 'Deleted an documentationType'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-documentation-type-delete-popup',
    template: ''
})
export class DocumentationTypeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ documentationType }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DocumentationTypeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.documentationType = documentationType;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
