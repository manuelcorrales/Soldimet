import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoOperacion } from './costo-operacion.model';
import { CostoOperacionPopupService } from './costo-operacion-popup.service';
import { CostoOperacionService } from './costo-operacion.service';
import { Cilindrada, CilindradaService } from '../cilindrada';
import { Operacion, OperacionService } from '../operacion';
import { TipoParteMotor, TipoParteMotorService } from '../tipo-parte-motor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-costo-operacion-dialog',
    templateUrl: './costo-operacion-dialog.component.html'
})
export class CostoOperacionDialogComponent implements OnInit {

    costoOperacion: CostoOperacion;
    isSaving: boolean;

    cilindradas: Cilindrada[];

    operacions: Operacion[];

    tipopartemotors: TipoParteMotor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costoOperacionService: CostoOperacionService,
        private cilindradaService: CilindradaService,
        private operacionService: OperacionService,
        private tipoParteMotorService: TipoParteMotorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.cilindradaService.query()
            .subscribe((res: ResponseWrapper) => { this.cilindradas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.operacionService.query()
            .subscribe((res: ResponseWrapper) => { this.operacions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipoParteMotorService.query()
            .subscribe((res: ResponseWrapper) => { this.tipopartemotors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costoOperacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costoOperacionService.update(this.costoOperacion));
        } else {
            this.subscribeToSaveResponse(
                this.costoOperacionService.create(this.costoOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<CostoOperacion>) {
        result.subscribe((res: CostoOperacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CostoOperacion) {
        this.eventManager.broadcast({ name: 'costoOperacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCilindradaById(index: number, item: Cilindrada) {
        return item.id;
    }

    trackOperacionById(index: number, item: Operacion) {
        return item.id;
    }

    trackTipoParteMotorById(index: number, item: TipoParteMotor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-costo-operacion-popup',
    template: ''
})
export class CostoOperacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoOperacionPopupService: CostoOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costoOperacionPopupService
                    .open(CostoOperacionDialogComponent as Component, params['id']);
            } else {
                this.costoOperacionPopupService
                    .open(CostoOperacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
