import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MovimientoPresupuesto } from './movimiento-presupuesto.model';
import { MovimientoPresupuestoPopupService } from './movimiento-presupuesto-popup.service';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';
import { Presupuesto, PresupuestoService } from '../presupuesto';
import { Movimiento, MovimientoService } from '../movimiento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-movimiento-presupuesto-dialog',
    templateUrl: './movimiento-presupuesto-dialog.component.html'
})
export class MovimientoPresupuestoDialogComponent implements OnInit {

    movimientoPresupuesto: MovimientoPresupuesto;
    isSaving: boolean;

    presupuestos: Presupuesto[];

    movimientos: Movimiento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        private presupuestoService: PresupuestoService,
        private movimientoService: MovimientoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.presupuestoService.query()
            .subscribe((res: ResponseWrapper) => { this.presupuestos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.movimientoService
            .query({filter: 'movimientopresupuesto-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.movimientoPresupuesto.movimiento || !this.movimientoPresupuesto.movimiento.id) {
                    this.movimientos = res.json;
                } else {
                    this.movimientoService
                        .find(this.movimientoPresupuesto.movimiento.id)
                        .subscribe((subRes: Movimiento) => {
                            this.movimientos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.movimientoPresupuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.movimientoPresupuestoService.update(this.movimientoPresupuesto));
        } else {
            this.subscribeToSaveResponse(
                this.movimientoPresupuestoService.create(this.movimientoPresupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<MovimientoPresupuesto>) {
        result.subscribe((res: MovimientoPresupuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MovimientoPresupuesto) {
        this.eventManager.broadcast({ name: 'movimientoPresupuestoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPresupuestoById(index: number, item: Presupuesto) {
        return item.id;
    }

    trackMovimientoById(index: number, item: Movimiento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-movimiento-presupuesto-popup',
    template: ''
})
export class MovimientoPresupuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoPresupuestoPopupService: MovimientoPresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.movimientoPresupuestoPopupService
                    .open(MovimientoPresupuestoDialogComponent as Component, params['id']);
            } else {
                this.movimientoPresupuestoPopupService
                    .open(MovimientoPresupuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
