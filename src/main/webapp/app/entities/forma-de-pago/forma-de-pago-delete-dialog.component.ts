import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { FormaDePago } from './forma-de-pago.model';
import { FormaDePagoPopupService } from './forma-de-pago-popup.service';
import { FormaDePagoService } from './forma-de-pago.service';

@Component({
    selector: 'jhi-forma-de-pago-delete-dialog',
    templateUrl: './forma-de-pago-delete-dialog.component.html'
})
export class FormaDePagoDeleteDialogComponent {

    formaDePago: FormaDePago;

    constructor(
        private formaDePagoService: FormaDePagoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.formaDePagoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'formaDePagoListModification',
                content: 'Deleted an formaDePago'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-forma-de-pago-delete-popup',
    template: ''
})
export class FormaDePagoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private formaDePagoPopupService: FormaDePagoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.formaDePagoPopupService
                .open(FormaDePagoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
