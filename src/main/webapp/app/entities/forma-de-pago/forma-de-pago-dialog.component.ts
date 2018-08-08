import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { FormaDePago } from './forma-de-pago.model';
import { FormaDePagoPopupService } from './forma-de-pago-popup.service';
import { FormaDePagoService } from './forma-de-pago.service';

@Component({
    selector: 'jhi-forma-de-pago-dialog',
    templateUrl: './forma-de-pago-dialog.component.html'
})
export class FormaDePagoDialogComponent implements OnInit {
    formaDePago: FormaDePago;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private formaDePagoService: FormaDePagoService,
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
        if (this.formaDePago.id !== undefined) {
            this.subscribeToSaveResponse(this.formaDePagoService.update(this.formaDePago));
        } else {
            this.subscribeToSaveResponse(this.formaDePagoService.create(this.formaDePago));
        }
    }

    private subscribeToSaveResponse(result: Observable<FormaDePago>) {
        result.subscribe((res: FormaDePago) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: FormaDePago) {
        this.eventManager.broadcast({ name: 'formaDePagoListModification', content: 'OK' });
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
    selector: 'jhi-forma-de-pago-popup',
    template: ''
})
export class FormaDePagoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private formaDePagoPopupService: FormaDePagoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.formaDePagoPopupService.open(FormaDePagoDialogComponent as Component, params['id']);
            } else {
                this.formaDePagoPopupService.open(FormaDePagoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
