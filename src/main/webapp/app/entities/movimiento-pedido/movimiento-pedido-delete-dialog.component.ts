import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MovimientoPedido } from './movimiento-pedido.model';
import { MovimientoPedidoPopupService } from './movimiento-pedido-popup.service';
import { MovimientoPedidoService } from './movimiento-pedido.service';

@Component({
    selector: 'jhi-movimiento-pedido-delete-dialog',
    templateUrl: './movimiento-pedido-delete-dialog.component.html'
})
export class MovimientoPedidoDeleteDialogComponent {

    movimientoPedido: MovimientoPedido;

    constructor(
        private movimientoPedidoService: MovimientoPedidoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movimientoPedidoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'movimientoPedidoListModification',
                content: 'Deleted an movimientoPedido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movimiento-pedido-delete-popup',
    template: ''
})
export class MovimientoPedidoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoPedidoPopupService: MovimientoPedidoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.movimientoPedidoPopupService
                .open(MovimientoPedidoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
