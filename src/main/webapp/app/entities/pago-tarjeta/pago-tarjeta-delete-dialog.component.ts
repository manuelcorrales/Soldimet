import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PagoTarjeta } from './pago-tarjeta.model';
import { PagoTarjetaPopupService } from './pago-tarjeta-popup.service';
import { PagoTarjetaService } from './pago-tarjeta.service';

@Component({
    selector: 'jhi-pago-tarjeta-delete-dialog',
    templateUrl: './pago-tarjeta-delete-dialog.component.html'
})
export class PagoTarjetaDeleteDialogComponent {

    pagoTarjeta: PagoTarjeta;

    constructor(
        private pagoTarjetaService: PagoTarjetaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagoTarjetaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pagoTarjetaListModification',
                content: 'Deleted an pagoTarjeta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pago-tarjeta-delete-popup',
    template: ''
})
export class PagoTarjetaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagoTarjetaPopupService: PagoTarjetaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagoTarjetaPopupService
                .open(PagoTarjetaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
