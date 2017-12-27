import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CobranzaOperacion } from './cobranza-operacion.model';
import { CobranzaOperacionPopupService } from './cobranza-operacion-popup.service';
import { CobranzaOperacionService } from './cobranza-operacion.service';
import { EstadoCobranzaOperacion, EstadoCobranzaOperacionService } from '../estado-cobranza-operacion';
import { Operacion, OperacionService } from '../operacion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-cobranza-operacion-dialog',
    templateUrl: './cobranza-operacion-dialog.component.html'
})
export class CobranzaOperacionDialogComponent implements OnInit {

    cobranzaOperacion: CobranzaOperacion;
    isSaving: boolean;

    estadocobranzaoperacions: EstadoCobranzaOperacion[];

    operacions: Operacion[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cobranzaOperacionService: CobranzaOperacionService,
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
        private operacionService: OperacionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.estadoCobranzaOperacionService.query()
            .subscribe((res: ResponseWrapper) => { this.estadocobranzaoperacions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.operacionService.query()
            .subscribe((res: ResponseWrapper) => { this.operacions = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cobranzaOperacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cobranzaOperacionService.update(this.cobranzaOperacion));
        } else {
            this.subscribeToSaveResponse(
                this.cobranzaOperacionService.create(this.cobranzaOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<CobranzaOperacion>) {
        result.subscribe((res: CobranzaOperacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CobranzaOperacion) {
        this.eventManager.broadcast({ name: 'cobranzaOperacionListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEstadoCobranzaOperacionById(index: number, item: EstadoCobranzaOperacion) {
        return item.id;
    }

    trackOperacionById(index: number, item: Operacion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cobranza-operacion-popup',
    template: ''
})
export class CobranzaOperacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobranzaOperacionPopupService: CobranzaOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cobranzaOperacionPopupService
                    .open(CobranzaOperacionDialogComponent as Component, params['id']);
            } else {
                this.cobranzaOperacionPopupService
                    .open(CobranzaOperacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
