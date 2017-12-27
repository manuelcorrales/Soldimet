import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoDetallePedido } from './estado-detalle-pedido.model';
import { EstadoDetallePedidoPopupService } from './estado-detalle-pedido-popup.service';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
    selector: 'jhi-estado-detalle-pedido-delete-dialog',
    templateUrl: './estado-detalle-pedido-delete-dialog.component.html'
})
export class EstadoDetallePedidoDeleteDialogComponent {

    estadoDetallePedido: EstadoDetallePedido;

    constructor(
        private estadoDetallePedidoService: EstadoDetallePedidoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoDetallePedidoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoDetallePedidoListModification',
                content: 'Deleted an estadoDetallePedido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-detalle-pedido-delete-popup',
    template: ''
})
export class EstadoDetallePedidoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoDetallePedidoPopupService: EstadoDetallePedidoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoDetallePedidoPopupService
                .open(EstadoDetallePedidoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
