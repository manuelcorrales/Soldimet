import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoPresupuesto } from './estado-presupuesto.model';
import { EstadoPresupuestoPopupService } from './estado-presupuesto-popup.service';
import { EstadoPresupuestoService } from './estado-presupuesto.service';

@Component({
    selector: 'jhi-estado-presupuesto-dialog',
    templateUrl: './estado-presupuesto-dialog.component.html'
})
export class EstadoPresupuestoDialogComponent implements OnInit {

    estadoPresupuesto: EstadoPresupuesto;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoPresupuestoService: EstadoPresupuestoService,
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
        if (this.estadoPresupuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoPresupuestoService.update(this.estadoPresupuesto));
        } else {
            this.subscribeToSaveResponse(
                this.estadoPresupuestoService.create(this.estadoPresupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoPresupuesto>) {
        result.subscribe((res: EstadoPresupuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoPresupuesto) {
        this.eventManager.broadcast({ name: 'estadoPresupuestoListModification', content: 'OK'});
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
    selector: 'jhi-estado-presupuesto-popup',
    template: ''
})
export class EstadoPresupuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPresupuestoPopupService: EstadoPresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoPresupuestoPopupService
                    .open(EstadoPresupuestoDialogComponent as Component, params['id']);
            } else {
                this.estadoPresupuestoPopupService
                    .open(EstadoPresupuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
