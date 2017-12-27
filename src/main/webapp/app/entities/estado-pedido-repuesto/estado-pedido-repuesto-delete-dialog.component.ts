import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoPedidoRepuesto } from './estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoPopupService } from './estado-pedido-repuesto-popup.service';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
    selector: 'jhi-estado-pedido-repuesto-delete-dialog',
    templateUrl: './estado-pedido-repuesto-delete-dialog.component.html'
})
export class EstadoPedidoRepuestoDeleteDialogComponent {

    estadoPedidoRepuesto: EstadoPedidoRepuesto;

    constructor(
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoPedidoRepuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoPedidoRepuestoListModification',
                content: 'Deleted an estadoPedidoRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-pedido-repuesto-delete-popup',
    template: ''
})
export class EstadoPedidoRepuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPedidoRepuestoPopupService: EstadoPedidoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoPedidoRepuestoPopupService
                .open(EstadoPedidoRepuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
