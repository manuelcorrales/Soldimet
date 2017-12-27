import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PedidoRepuesto } from './pedido-repuesto.model';
import { PedidoRepuestoPopupService } from './pedido-repuesto-popup.service';
import { PedidoRepuestoService } from './pedido-repuesto.service';

@Component({
    selector: 'jhi-pedido-repuesto-delete-dialog',
    templateUrl: './pedido-repuesto-delete-dialog.component.html'
})
export class PedidoRepuestoDeleteDialogComponent {

    pedidoRepuesto: PedidoRepuesto;

    constructor(
        private pedidoRepuestoService: PedidoRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pedidoRepuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pedidoRepuestoListModification',
                content: 'Deleted an pedidoRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pedido-repuesto-delete-popup',
    template: ''
})
export class PedidoRepuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pedidoRepuestoPopupService: PedidoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pedidoRepuestoPopupService
                .open(PedidoRepuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
