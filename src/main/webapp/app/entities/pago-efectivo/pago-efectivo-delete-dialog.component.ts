import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PagoEfectivo } from './pago-efectivo.model';
import { PagoEfectivoPopupService } from './pago-efectivo-popup.service';
import { PagoEfectivoService } from './pago-efectivo.service';

@Component({
    selector: 'jhi-pago-efectivo-delete-dialog',
    templateUrl: './pago-efectivo-delete-dialog.component.html'
})
export class PagoEfectivoDeleteDialogComponent {

    pagoEfectivo: PagoEfectivo;

    constructor(
        private pagoEfectivoService: PagoEfectivoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagoEfectivoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pagoEfectivoListModification',
                content: 'Deleted an pagoEfectivo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pago-efectivo-delete-popup',
    template: ''
})
export class PagoEfectivoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagoEfectivoPopupService: PagoEfectivoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagoEfectivoPopupService
                .open(PagoEfectivoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
