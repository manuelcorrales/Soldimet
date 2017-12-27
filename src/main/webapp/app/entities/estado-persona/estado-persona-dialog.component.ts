import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoPersona } from './estado-persona.model';
import { EstadoPersonaPopupService } from './estado-persona-popup.service';
import { EstadoPersonaService } from './estado-persona.service';

@Component({
    selector: 'jhi-estado-persona-dialog',
    templateUrl: './estado-persona-dialog.component.html'
})
export class EstadoPersonaDialogComponent implements OnInit {

    estadoPersona: EstadoPersona;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoPersonaService: EstadoPersonaService,
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
        if (this.estadoPersona.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoPersonaService.update(this.estadoPersona));
        } else {
            this.subscribeToSaveResponse(
                this.estadoPersonaService.create(this.estadoPersona));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoPersona>) {
        result.subscribe((res: EstadoPersona) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoPersona) {
        this.eventManager.broadcast({ name: 'estadoPersonaListModification', content: 'OK'});
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
    selector: 'jhi-estado-persona-popup',
    template: ''
})
export class EstadoPersonaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPersonaPopupService: EstadoPersonaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoPersonaPopupService
                    .open(EstadoPersonaDialogComponent as Component, params['id']);
            } else {
                this.estadoPersonaPopupService
                    .open(EstadoPersonaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
