import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoTarjeta } from './tipo-tarjeta.model';
import { TipoTarjetaPopupService } from './tipo-tarjeta-popup.service';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Component({
    selector: 'jhi-tipo-tarjeta-dialog',
    templateUrl: './tipo-tarjeta-dialog.component.html'
})
export class TipoTarjetaDialogComponent implements OnInit {
    tipoTarjeta: TipoTarjeta;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoTarjetaService: TipoTarjetaService,
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
        if (this.tipoTarjeta.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoTarjetaService.update(this.tipoTarjeta));
        } else {
            this.subscribeToSaveResponse(this.tipoTarjetaService.create(this.tipoTarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoTarjeta>) {
        result.subscribe((res: TipoTarjeta) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoTarjeta) {
        this.eventManager.broadcast({ name: 'tipoTarjetaListModification', content: 'OK' });
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
    selector: 'jhi-tipo-tarjeta-popup',
    template: ''
})
export class TipoTarjetaPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tipoTarjetaPopupService: TipoTarjetaPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.tipoTarjetaPopupService.open(TipoTarjetaDialogComponent as Component, params['id']);
            } else {
                this.tipoTarjetaPopupService.open(TipoTarjetaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
