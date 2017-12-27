import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PagoTarjeta } from './pago-tarjeta.model';
import { PagoTarjetaPopupService } from './pago-tarjeta-popup.service';
import { PagoTarjetaService } from './pago-tarjeta.service';
import { FormaDePago, FormaDePagoService } from '../forma-de-pago';
import { Tarjeta, TarjetaService } from '../tarjeta';
import { TipoTarjeta, TipoTarjetaService } from '../tipo-tarjeta';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pago-tarjeta-dialog',
    templateUrl: './pago-tarjeta-dialog.component.html'
})
export class PagoTarjetaDialogComponent implements OnInit {

    pagoTarjeta: PagoTarjeta;
    isSaving: boolean;

    formadepagos: FormaDePago[];

    tarjetas: Tarjeta[];

    tipotarjetas: TipoTarjeta[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pagoTarjetaService: PagoTarjetaService,
        private formaDePagoService: FormaDePagoService,
        private tarjetaService: TarjetaService,
        private tipoTarjetaService: TipoTarjetaService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.formaDePagoService
            .query({filter: 'pagotarjeta-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.pagoTarjeta.formaDePago || !this.pagoTarjeta.formaDePago.id) {
                    this.formadepagos = res.json;
                } else {
                    this.formaDePagoService
                        .find(this.pagoTarjeta.formaDePago.id)
                        .subscribe((subRes: FormaDePago) => {
                            this.formadepagos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
        this.tarjetaService.query()
            .subscribe((res: ResponseWrapper) => { this.tarjetas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipoTarjetaService.query()
            .subscribe((res: ResponseWrapper) => { this.tipotarjetas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pagoTarjeta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.pagoTarjetaService.update(this.pagoTarjeta));
        } else {
            this.subscribeToSaveResponse(
                this.pagoTarjetaService.create(this.pagoTarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<PagoTarjeta>) {
        result.subscribe((res: PagoTarjeta) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PagoTarjeta) {
        this.eventManager.broadcast({ name: 'pagoTarjetaListModification', content: 'OK'});
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

    trackTarjetaById(index: number, item: Tarjeta) {
        return item.id;
    }

    trackTipoTarjetaById(index: number, item: TipoTarjeta) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pago-tarjeta-popup',
    template: ''
})
export class PagoTarjetaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagoTarjetaPopupService: PagoTarjetaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.pagoTarjetaPopupService
                    .open(PagoTarjetaDialogComponent as Component, params['id']);
            } else {
                this.pagoTarjetaPopupService
                    .open(PagoTarjetaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
