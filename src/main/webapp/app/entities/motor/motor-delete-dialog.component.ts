import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Motor } from './motor.model';
import { MotorPopupService } from './motor-popup.service';
import { MotorService } from './motor.service';

@Component({
    selector: 'jhi-motor-delete-dialog',
    templateUrl: './motor-delete-dialog.component.html'
})
export class MotorDeleteDialogComponent {

    motor: Motor;

    constructor(
        private motorService: MotorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.motorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'motorListModification',
                content: 'Deleted an motor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-motor-delete-popup',
    template: ''
})
export class MotorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private motorPopupService: MotorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.motorPopupService
                .open(MotorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
