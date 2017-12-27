import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { SubCategoria } from './sub-categoria.model';
import { SubCategoriaPopupService } from './sub-categoria-popup.service';
import { SubCategoriaService } from './sub-categoria.service';

@Component({
    selector: 'jhi-sub-categoria-delete-dialog',
    templateUrl: './sub-categoria-delete-dialog.component.html'
})
export class SubCategoriaDeleteDialogComponent {

    subCategoria: SubCategoria;

    constructor(
        private subCategoriaService: SubCategoriaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.subCategoriaService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private subCategoriaPopupService: SubCategoriaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.subCategoriaPopupService
                .open(SubCategoriaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
