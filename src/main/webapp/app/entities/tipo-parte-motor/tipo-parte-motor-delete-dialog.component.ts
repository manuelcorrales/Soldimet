import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { TipoParteMotor } from './tipo-parte-motor.model';
import { TipoParteMotorPopupService } from './tipo-parte-motor-popup.service';
import { TipoParteMotorService } from './tipo-parte-motor.service';

@Component({
    selector: 'jhi-tipo-parte-motor-delete-dialog',
    templateUrl: './tipo-parte-motor-delete-dialog.component.html'
})
export class TipoParteMotorDeleteDialogComponent {

    tipoParteMotor: TipoParteMotor;

    constructor(
        private tipoParteMotorService: TipoParteMotorService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.tipoParteMotorService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'tipoParteMotorListModification',
                content: 'Deleted an tipoParteMotor'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-tipo-parte-motor-delete-popup',
    template: ''
})
export class TipoParteMotorDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private tipoParteMotorPopupService: TipoParteMotorPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.tipoParteMotorPopupService
                .open(TipoParteMotorDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
