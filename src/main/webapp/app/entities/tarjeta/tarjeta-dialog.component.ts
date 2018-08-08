import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Tarjeta } from './tarjeta.model';
import { TarjetaPopupService } from './tarjeta-popup.service';
import { TarjetaService } from './tarjeta.service';

@Component({
    selector: 'jhi-tarjeta-dialog',
    templateUrl: './tarjeta-dialog.component.html'
})
export class TarjetaDialogComponent implements OnInit {
    tarjeta: Tarjeta;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tarjetaService: TarjetaService,
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
        if (this.tarjeta.id !== undefined) {
            this.subscribeToSaveResponse(this.tarjetaService.update(this.tarjeta));
        } else {
            this.subscribeToSaveResponse(this.tarjetaService.create(this.tarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<Tarjeta>) {
        result.subscribe((res: Tarjeta) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Tarjeta) {
        this.eventManager.broadcast({ name: 'tarjetaListModification', content: 'OK' });
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
    selector: 'jhi-tarjeta-popup',
    template: ''
})
export class TarjetaPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tarjetaPopupService: TarjetaPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.tarjetaPopupService.open(TarjetaDialogComponent as Component, params['id']);
            } else {
                this.tarjetaPopupService.open(TarjetaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
