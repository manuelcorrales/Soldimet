import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoMovimiento } from './tipo-movimiento.model';
import { TipoMovimientoPopupService } from './tipo-movimiento-popup.service';
import { TipoMovimientoService } from './tipo-movimiento.service';

@Component({
    selector: 'jhi-tipo-movimiento-dialog',
    templateUrl: './tipo-movimiento-dialog.component.html'
})
export class TipoMovimientoDialogComponent implements OnInit {

    tipoMovimiento: TipoMovimiento;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoMovimientoService: TipoMovimientoService,
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
        if (this.tipoMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoMovimientoService.update(this.tipoMovimiento));
        } else {
            this.subscribeToSaveResponse(
                this.tipoMovimientoService.create(this.tipoMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoMovimiento>) {
        result.subscribe((res: TipoMovimiento) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoMovimiento) {
        this.eventManager.broadcast({ name: 'tipoMovimientoListModification', content: 'OK'});
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
    selector: 'jhi-tipo-movimiento-popup',
    template: ''
})
export class TipoMovimientoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoMovimientoPopupService: TipoMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoMovimientoPopupService
                    .open(TipoMovimientoDialogComponent as Component, params['id']);
            } else {
                this.tipoMovimientoPopupService
                    .open(TipoMovimientoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
