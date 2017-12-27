import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Aplicacion } from './aplicacion.model';
import { AplicacionPopupService } from './aplicacion-popup.service';
import { AplicacionService } from './aplicacion.service';

@Component({
    selector: 'jhi-aplicacion-dialog',
    templateUrl: './aplicacion-dialog.component.html'
})
export class AplicacionDialogComponent implements OnInit {

    aplicacion: Aplicacion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private aplicacionService: AplicacionService,
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
        if (this.aplicacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.aplicacionService.update(this.aplicacion));
        } else {
            this.subscribeToSaveResponse(
                this.aplicacionService.create(this.aplicacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<Aplicacion>) {
        result.subscribe((res: Aplicacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Aplicacion) {
        this.eventManager.broadcast({ name: 'aplicacionListModification', content: 'OK'});
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
    selector: 'jhi-aplicacion-popup',
    template: ''
})
export class AplicacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private aplicacionPopupService: AplicacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.aplicacionPopupService
                    .open(AplicacionDialogComponent as Component, params['id']);
            } else {
                this.aplicacionPopupService
                    .open(AplicacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
