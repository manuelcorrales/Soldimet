import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoRepuesto } from './tipo-repuesto.model';
import { TipoRepuestoPopupService } from './tipo-repuesto-popup.service';
import { TipoRepuestoService } from './tipo-repuesto.service';

@Component({
    selector: 'jhi-tipo-repuesto-dialog',
    templateUrl: './tipo-repuesto-dialog.component.html'
})
export class TipoRepuestoDialogComponent implements OnInit {

    tipoRepuesto: TipoRepuesto;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoRepuestoService: TipoRepuestoService,
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
        if (this.tipoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.tipoRepuestoService.update(this.tipoRepuesto));
        } else {
            this.subscribeToSaveResponse(
                this.tipoRepuestoService.create(this.tipoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoRepuesto>) {
        result.subscribe((res: TipoRepuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoRepuesto) {
        this.eventManager.broadcast({ name: 'tipoRepuestoListModification', content: 'OK'});
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
    selector: 'jhi-tipo-repuesto-popup',
    template: ''
})
export class TipoRepuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoRepuestoPopupService: TipoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.tipoRepuestoPopupService
                    .open(TipoRepuestoDialogComponent as Component, params['id']);
            } else {
                this.tipoRepuestoPopupService
                    .open(TipoRepuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
