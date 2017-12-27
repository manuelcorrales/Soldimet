import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Motor } from './motor.model';
import { MotorPopupService } from './motor-popup.service';
import { MotorService } from './motor.service';

@Component({
    selector: 'jhi-motor-dialog',
    templateUrl: './motor-dialog.component.html'
})
export class MotorDialogComponent implements OnInit {

    motor: Motor;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private motorService: MotorService,
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
        if (this.motor.id !== undefined) {
            this.subscribeToSaveResponse(
                this.motorService.update(this.motor));
        } else {
            this.subscribeToSaveResponse(
                this.motorService.create(this.motor));
        }
    }

    private subscribeToSaveResponse(result: Observable<Motor>) {
        result.subscribe((res: Motor) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Motor) {
        this.eventManager.broadcast({ name: 'motorListModification', content: 'OK'});
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
    selector: 'jhi-motor-popup',
    template: ''
})
export class MotorPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motorPopupService: MotorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.motorPopupService
                    .open(MotorDialogComponent as Component, params['id']);
            } else {
                this.motorPopupService
                    .open(MotorDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
