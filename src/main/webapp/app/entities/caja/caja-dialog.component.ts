import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Caja } from './caja.model';
import { CajaPopupService } from './caja-popup.service';
import { CajaService } from './caja.service';

@Component({
    selector: 'jhi-caja-dialog',
    templateUrl: './caja-dialog.component.html'
})
export class CajaDialogComponent implements OnInit {

    caja: Caja;
    isSaving: boolean;
    fechaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private cajaService: CajaService,
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
        if (this.caja.id !== undefined) {
            this.subscribeToSaveResponse(
                this.cajaService.update(this.caja));
        } else {
            this.subscribeToSaveResponse(
                this.cajaService.create(this.caja));
        }
    }

    private subscribeToSaveResponse(result: Observable<Caja>) {
        result.subscribe((res: Caja) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Caja) {
        this.eventManager.broadcast({ name: 'cajaListModification', content: 'OK'});
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
    selector: 'jhi-caja-popup',
    template: ''
})
export class CajaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cajaPopupService: CajaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.cajaPopupService
                    .open(CajaDialogComponent as Component, params['id']);
            } else {
                this.cajaPopupService
                    .open(CajaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
