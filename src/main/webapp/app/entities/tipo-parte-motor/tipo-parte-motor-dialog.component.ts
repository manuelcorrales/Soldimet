import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { TipoParteMotor } from './tipo-parte-motor.model';
import { TipoParteMotorPopupService } from './tipo-parte-motor-popup.service';
import { TipoParteMotorService } from './tipo-parte-motor.service';

@Component({
    selector: 'jhi-tipo-parte-motor-dialog',
    templateUrl: './tipo-parte-motor-dialog.component.html'
})
export class TipoParteMotorDialogComponent implements OnInit {
    tipoParteMotor: TipoParteMotor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private tipoParteMotorService: TipoParteMotorService,
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
        if (this.tipoParteMotor.id !== undefined) {
            this.subscribeToSaveResponse(this.tipoParteMotorService.update(this.tipoParteMotor));
        } else {
            this.subscribeToSaveResponse(this.tipoParteMotorService.create(this.tipoParteMotor));
        }
    }

    private subscribeToSaveResponse(result: Observable<TipoParteMotor>) {
        result.subscribe((res: TipoParteMotor) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: TipoParteMotor) {
        this.eventManager.broadcast({ name: 'tipoParteMotorListModification', content: 'OK' });
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
    selector: 'jhi-tipo-parte-motor-popup',
    template: ''
})
export class TipoParteMotorPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private tipoParteMotorPopupService: TipoParteMotorPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.tipoParteMotorPopupService.open(TipoParteMotorDialogComponent as Component, params['id']);
            } else {
                this.tipoParteMotorPopupService.open(TipoParteMotorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
