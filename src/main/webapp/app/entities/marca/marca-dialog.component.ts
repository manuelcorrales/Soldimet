import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Marca } from './marca.model';
import { MarcaPopupService } from './marca-popup.service';
import { MarcaService } from './marca.service';

@Component({
    selector: 'jhi-marca-dialog',
    templateUrl: './marca-dialog.component.html'
})
export class MarcaDialogComponent implements OnInit {

    marca: Marca;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private marcaService: MarcaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.marca.id !== undefined) {
            this.subscribeToSaveResponse(
                this.marcaService.update(this.marca));
        } else {
            this.subscribeToSaveResponse(
                this.marcaService.create(this.marca));
        }
    }

    private subscribeToSaveResponse(result: Observable<Marca>) {
        result.subscribe((res: Marca) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Marca) {
        this.eventManager.broadcast({ name: 'marcaListModification', content: 'OK'});
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
    selector: 'jhi-marca-popup',
    template: ''
})
export class MarcaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marcaPopupService: MarcaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.marcaPopupService
                    .open(MarcaDialogComponent as Component, params['id']);
            } else {
                this.marcaPopupService
                    .open(MarcaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
