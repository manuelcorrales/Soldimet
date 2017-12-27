import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoDetalleMovimiento } from './tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoPopupService } from './tipo-detalle-movimiento-popup.service';
import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';

@Component({
    selector: 'jhi-tipo-detalle-movimiento-dialog',
    templateUrl: './tipo-detalle-movimiento-dialog.component.html'
})
export class TipoDetalleMovimientoDialogComponent implements OnInit {

    tipoDetalleMovimiento: TipoDetalleMovimiento;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
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
        if (this.tipoDetalleMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoDetalleMovimientoService.update(this.tipoDetalleMovimiento));
        } else {
            this.subscribeToSaveResponse(
                this.tipoDetalleMovimientoService.create(this.tipoDetalleMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoDetalleMovimiento>) {
        result.subscribe((res: TipoDetalleMovimiento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoDetalleMovimiento) {
        this.eventManager.broadcast({ name: 'tipoDetalleMovimientoListModification', content: 'OK'});
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
    selector: 'jhi-tipo-detalle-movimiento-popup',
    template: ''
})
export class TipoDetalleMovimientoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoDetalleMovimientoPopupService: TipoDetalleMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoDetalleMovimientoPopupService
                    .open(TipoDetalleMovimientoDialogComponent as Component, params['id']);
            } else {
                this.tipoDetalleMovimientoPopupService
                    .open(TipoDetalleMovimientoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
