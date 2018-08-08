import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { SubCategoria } from './sub-categoria.model';
import { SubCategoriaPopupService } from './sub-categoria-popup.service';
import { SubCategoriaService } from './sub-categoria.service';

@Component({
    selector: 'jhi-sub-categoria-dialog',
    templateUrl: './sub-categoria-dialog.component.html'
})
export class SubCategoriaDialogComponent implements OnInit {
    subCategoria: SubCategoria;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private subCategoriaService: SubCategoriaService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.subCategoria.id !== undefined) {
            this.subscribeToSaveResponse(this.subCategoriaService.update(this.subCategoria));
        } else {
            this.subscribeToSaveResponse(this.subCategoriaService.create(this.subCategoria));
        }
    }

    private subscribeToSaveResponse(result: Observable<SubCategoria>) {
        result.subscribe((res: SubCategoria) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: SubCategoria) {
        this.eventManager.broadcast({ name: 'subCategoriaListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-sub-categoria-popup',
    template: ''
})
export class SubCategoriaPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private subCategoriaPopupService: SubCategoriaPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.subCategoriaPopupService.open(SubCategoriaDialogComponent as Component, params['id']);
            } else {
                this.subCategoriaPopupService.open(SubCategoriaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
