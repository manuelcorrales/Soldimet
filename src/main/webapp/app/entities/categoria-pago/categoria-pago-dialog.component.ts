import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CategoriaPago } from './categoria-pago.model';
import { CategoriaPagoPopupService } from './categoria-pago-popup.service';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
    selector: 'jhi-categoria-pago-dialog',
    templateUrl: './categoria-pago-dialog.component.html'
})
export class CategoriaPagoDialogComponent implements OnInit {

    categoriaPago: CategoriaPago;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private categoriaPagoService: CategoriaPagoService,
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
        if (this.categoriaPago.id !== undefined) {
            this.subscribeToSaveResponse(
                this.categoriaPagoService.update(this.categoriaPago));
        } else {
            this.subscribeToSaveResponse(
                this.categoriaPagoService.create(this.categoriaPago));
        }
    }

    private subscribeToSaveResponse(result: Observable<CategoriaPago>) {
        result.subscribe((res: CategoriaPago) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CategoriaPago) {
        this.eventManager.broadcast({ name: 'categoriaPagoListModification', content: 'OK'});
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
    selector: 'jhi-categoria-pago-popup',
    template: ''
})
export class CategoriaPagoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaPagoPopupService: CategoriaPagoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.categoriaPagoPopupService
                    .open(CategoriaPagoDialogComponent as Component, params['id']);
            } else {
                this.categoriaPagoPopupService
                    .open(CategoriaPagoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
