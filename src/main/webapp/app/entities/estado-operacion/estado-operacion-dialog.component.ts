import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoOperacion } from './estado-operacion.model';
import { EstadoOperacionPopupService } from './estado-operacion-popup.service';
import { EstadoOperacionService } from './estado-operacion.service';

@Component({
    selector: 'jhi-estado-operacion-dialog',
    templateUrl: './estado-operacion-dialog.component.html'
})
export class EstadoOperacionDialogComponent implements OnInit {

    estadoOperacion: EstadoOperacion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoOperacionService: EstadoOperacionService,
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
        if (this.estadoOperacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoOperacionService.update(this.estadoOperacion));
        } else {
            this.subscribeToSaveResponse(
                this.estadoOperacionService.create(this.estadoOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoOperacion>) {
        result.subscribe((res: EstadoOperacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoOperacion) {
        this.eventManager.broadcast({ name: 'estadoOperacionListModification', content: 'OK'});
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
    selector: 'jhi-estado-operacion-popup',
    template: ''
})
export class EstadoOperacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoOperacionPopupService: EstadoOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoOperacionPopupService
                    .open(EstadoOperacionDialogComponent as Component, params['id']);
            } else {
                this.estadoOperacionPopupService
                    .open(EstadoOperacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
