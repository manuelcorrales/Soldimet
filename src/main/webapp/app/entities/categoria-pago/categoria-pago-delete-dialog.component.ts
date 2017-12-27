import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CategoriaPago } from './categoria-pago.model';
import { CategoriaPagoPopupService } from './categoria-pago-popup.service';
import { CategoriaPagoService } from './categoria-pago.service';

@Component({
    selector: 'jhi-categoria-pago-delete-dialog',
    templateUrl: './categoria-pago-delete-dialog.component.html'
})
export class CategoriaPagoDeleteDialogComponent {

    categoriaPago: CategoriaPago;

    constructor(
        private categoriaPagoService: CategoriaPagoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.categoriaPagoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'categoriaPagoListModification',
                content: 'Deleted an categoriaPago'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-categoria-pago-delete-popup',
    template: ''
})
export class CategoriaPagoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private categoriaPagoPopupService: CategoriaPagoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.categoriaPagoPopupService
                .open(CategoriaPagoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
