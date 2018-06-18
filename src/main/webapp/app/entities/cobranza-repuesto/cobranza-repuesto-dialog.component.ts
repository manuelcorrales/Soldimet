import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CobranzaRepuesto } from './cobranza-repuesto.model';
import { CobranzaRepuestoPopupService } from './cobranza-repuesto-popup.service';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { TipoRepuesto, TipoRepuestoService } from '../tipo-repuesto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-cobranza-repuesto-dialog',
    templateUrl: './cobranza-repuesto-dialog.component.html'
})
export class CobranzaRepuestoDialogComponent implements OnInit {

    cobranzaRepuesto: CobranzaRepuesto;
    isSaving: boolean;

    tiporepuestos: TipoRepuesto[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cobranzaRepuestoService: CobranzaRepuestoService,
        private tipoRepuestoService: TipoRepuestoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoRepuestoService.query()
            .subscribe((res: ResponseWrapper) => { this.tiporepuestos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.cobranzaRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cobranzaRepuestoService.update(this.cobranzaRepuesto));
        } else {
            this.subscribeToSaveResponse(
                this.cobranzaRepuestoService.create(this.cobranzaRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<CobranzaRepuesto>) {
        result.subscribe((res: CobranzaRepuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CobranzaRepuesto) {
        this.eventManager.broadcast({ name: 'cobranzaRepuestoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoRepuestoById(index: number, item: TipoRepuesto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-cobranza-repuesto-popup',
    template: ''
})
export class CobranzaRepuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cobranzaRepuestoPopupService: CobranzaRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cobranzaRepuestoPopupService
                    .open(CobranzaRepuestoDialogComponent as Component, params['id']);
            } else {
                this.cobranzaRepuestoPopupService
                    .open(CobranzaRepuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
