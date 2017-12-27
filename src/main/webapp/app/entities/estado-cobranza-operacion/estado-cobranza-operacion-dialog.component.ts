import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoCobranzaOperacion } from './estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionPopupService } from './estado-cobranza-operacion-popup.service';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Component({
    selector: 'jhi-estado-cobranza-operacion-dialog',
    templateUrl: './estado-cobranza-operacion-dialog.component.html'
})
export class EstadoCobranzaOperacionDialogComponent implements OnInit {

    estadoCobranzaOperacion: EstadoCobranzaOperacion;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
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
        if (this.estadoCobranzaOperacion.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoCobranzaOperacionService.update(this.estadoCobranzaOperacion));
        } else {
            this.subscribeToSaveResponse(
                this.estadoCobranzaOperacionService.create(this.estadoCobranzaOperacion));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoCobranzaOperacion>) {
        result.subscribe((res: EstadoCobranzaOperacion) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoCobranzaOperacion) {
        this.eventManager.broadcast({ name: 'estadoCobranzaOperacionListModification', content: 'OK'});
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
    selector: 'jhi-estado-cobranza-operacion-popup',
    template: ''
})
export class EstadoCobranzaOperacionPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoCobranzaOperacionPopupService: EstadoCobranzaOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoCobranzaOperacionPopupService
                    .open(EstadoCobranzaOperacionDialogComponent as Component, params['id']);
            } else {
                this.estadoCobranzaOperacionPopupService
                    .open(EstadoCobranzaOperacionDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
