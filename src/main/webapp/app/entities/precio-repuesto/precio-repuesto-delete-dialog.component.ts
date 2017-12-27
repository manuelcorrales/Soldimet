import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PrecioRepuesto } from './precio-repuesto.model';
import { PrecioRepuestoPopupService } from './precio-repuesto-popup.service';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Component({
    selector: 'jhi-precio-repuesto-delete-dialog',
    templateUrl: './precio-repuesto-delete-dialog.component.html'
})
export class PrecioRepuestoDeleteDialogComponent {

    precioRepuesto: PrecioRepuesto;

    constructor(
        private precioRepuestoService: PrecioRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.precioRepuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'precioRepuestoListModification',
                content: 'Deleted an precioRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-precio-repuesto-delete-popup',
    template: ''
})
export class PrecioRepuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private precioRepuestoPopupService: PrecioRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.precioRepuestoPopupService
                .open(PrecioRepuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
