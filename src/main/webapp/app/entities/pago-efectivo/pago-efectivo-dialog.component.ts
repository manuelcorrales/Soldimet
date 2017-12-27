import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PagoEfectivo } from './pago-efectivo.model';
import { PagoEfectivoPopupService } from './pago-efectivo-popup.service';
import { PagoEfectivoService } from './pago-efectivo.service';
import { FormaDePago, FormaDePagoService } from '../forma-de-pago';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pago-efectivo-dialog',
    templateUrl: './pago-efectivo-dialog.component.html'
})
export class PagoEfectivoDialogComponent implements OnInit {

    pagoEfectivo: PagoEfectivo;
    isSaving: boolean;

    formadepagos: FormaDePago[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pagoEfectivoService: PagoEfectivoService,
        private formaDePagoService: FormaDePagoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formaDePagoService
            .query({filter: 'pagoefectivo-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.pagoEfectivo.formaDePago || !this.pagoEfectivo.formaDePago.id) {
                    this.formadepagos = res.json;
                } else {
                    this.formaDePagoService
                        .find(this.pagoEfectivo.formaDePago.id)
                        .subscribe((subRes: FormaDePago) => {
                            this.formadepagos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pagoEfectivo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pagoEfectivoService.update(this.pagoEfectivo));
        } else {
            this.subscribeToSaveResponse(
                this.pagoEfectivoService.create(this.pagoEfectivo));
        }
    }

    private subscribeToSaveResponse(result: Observable<PagoEfectivo>) {
        result.subscribe((res: PagoEfectivo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PagoEfectivo) {
        this.eventManager.broadcast({ name: 'pagoEfectivoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackFormaDePagoById(index: number, item: FormaDePago) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pago-efectivo-popup',
    template: ''
})
export class PagoEfectivoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagoEfectivoPopupService: PagoEfectivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagoEfectivoPopupService
                    .open(PagoEfectivoDialogComponent as Component, params['id']);
            } else {
                this.pagoEfectivoPopupService
                    .open(PagoEfectivoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
