import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Localidad } from './localidad.model';
import { LocalidadPopupService } from './localidad-popup.service';
import { LocalidadService } from './localidad.service';

@Component({
    selector: 'jhi-localidad-dialog',
    templateUrl: './localidad-dialog.component.html'
})
export class LocalidadDialogComponent implements OnInit {

    localidad: Localidad;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private localidadService: LocalidadService,
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
        if (this.localidad.id !== undefined) {
            this.subscribeToSaveResponse(
                this.localidadService.update(this.localidad));
        } else {
            this.subscribeToSaveResponse(
                this.localidadService.create(this.localidad));
        }
    }

    private subscribeToSaveResponse(result: Observable<Localidad>) {
        result.subscribe((res: Localidad) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Localidad) {
        this.eventManager.broadcast({ name: 'localidadListModification', content: 'OK'});
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
    selector: 'jhi-localidad-popup',
    template: ''
})
export class LocalidadPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private localidadPopupService: LocalidadPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.localidadPopupService
                    .open(LocalidadDialogComponent as Component, params['id']);
            } else {
                this.localidadPopupService
                    .open(LocalidadDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
