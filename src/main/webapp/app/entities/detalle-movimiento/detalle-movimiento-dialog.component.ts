import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DetalleMovimiento } from './detalle-movimiento.model';
import { DetalleMovimientoPopupService } from './detalle-movimiento-popup.service';
import { DetalleMovimientoService } from './detalle-movimiento.service';
import { TipoDetalleMovimiento, TipoDetalleMovimientoService } from '../tipo-detalle-movimiento';
import { Presupuesto, PresupuestoService } from '../presupuesto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-detalle-movimiento-dialog',
    templateUrl: './detalle-movimiento-dialog.component.html'
})
export class DetalleMovimientoDialogComponent implements OnInit {

    detalleMovimiento: DetalleMovimiento;
    isSaving: boolean;

    tipodetallemovimientos: TipoDetalleMovimiento[];

    presupuestos: Presupuesto[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private detalleMovimientoService: DetalleMovimientoService,
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
        private presupuestoService: PresupuestoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoDetalleMovimientoService.query()
            .subscribe((res: ResponseWrapper) => { this.tipodetallemovimientos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.presupuestoService.query()
            .subscribe((res: ResponseWrapper) => { this.presupuestos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.detalleMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.detalleMovimientoService.update(this.detalleMovimiento));
        } else {
            this.subscribeToSaveResponse(
                this.detalleMovimientoService.create(this.detalleMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<DetalleMovimiento>) {
        result.subscribe((res: DetalleMovimiento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DetalleMovimiento) {
        this.eventManager.broadcast({ name: 'detalleMovimientoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoDetalleMovimientoById(index: number, item: TipoDetalleMovimiento) {
        return item.id;
    }

    trackPresupuestoById(index: number, item: Presupuesto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-detalle-movimiento-popup',
    template: ''
})
export class DetalleMovimientoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detalleMovimientoPopupService: DetalleMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.detalleMovimientoPopupService
                    .open(DetalleMovimientoDialogComponent as Component, params['id']);
            } else {
                this.detalleMovimientoPopupService
                    .open(DetalleMovimientoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
