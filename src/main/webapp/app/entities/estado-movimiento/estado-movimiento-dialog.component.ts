import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoMovimiento } from './estado-movimiento.model';
import { EstadoMovimientoPopupService } from './estado-movimiento-popup.service';
import { EstadoMovimientoService } from './estado-movimiento.service';

@Component({
    selector: 'jhi-estado-movimiento-dialog',
    templateUrl: './estado-movimiento-dialog.component.html'
})
export class EstadoMovimientoDialogComponent implements OnInit {
    estadoMovimiento: EstadoMovimiento;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoMovimientoService: EstadoMovimientoService,
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
        if (this.estadoMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoMovimientoService.update(this.estadoMovimiento));
        } else {
            this.subscribeToSaveResponse(this.estadoMovimientoService.create(this.estadoMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoMovimiento>) {
        result.subscribe((res: EstadoMovimiento) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoMovimiento) {
        this.eventManager.broadcast({ name: 'estadoMovimientoListModification', content: 'OK' });
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
    selector: 'jhi-estado-movimiento-popup',
    template: ''
})
export class EstadoMovimientoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private estadoMovimientoPopupService: EstadoMovimientoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.estadoMovimientoPopupService.open(EstadoMovimientoDialogComponent as Component, params['id']);
            } else {
                this.estadoMovimientoPopupService.open(EstadoMovimientoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
