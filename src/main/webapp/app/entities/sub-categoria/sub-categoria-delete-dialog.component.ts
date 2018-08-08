import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISubCategoria } from 'app/shared/model/sub-categoria.model';
import { SubCategoriaService } from './sub-categoria.service';

@Component({
    selector: 'jhi-sub-categoria-delete-dialog',
    templateUrl: './sub-categoria-delete-dialog.component.html'
})
export class SubCategoriaDeleteDialogComponent {
    subCategoria: ISubCategoria;

    constructor(
        private subCategoriaService: SubCategoriaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subCategoriaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'subCategoriaListModification',
                content: 'Deleted an subCategoria'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sub-categoria-delete-popup',
    template: ''
})
export class SubCategoriaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ subCategoria }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SubCategoriaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.subCategoria = subCategoria;
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
