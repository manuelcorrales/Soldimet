import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { DetallePedido } from './detalle-pedido.model';
import { DetallePedidoPopupService } from './detalle-pedido-popup.service';
import { DetallePedidoService } from './detalle-pedido.service';

@Component({
    selector: 'jhi-detalle-pedido-delete-dialog',
    templateUrl: './detalle-pedido-delete-dialog.component.html'
})
export class DetallePedidoDeleteDialogComponent {

    detallePedido: DetallePedido;

    constructor(
        private detallePedidoService: DetallePedidoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detallePedidoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'detallePedidoListModification',
                content: 'Deleted an detallePedido'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-detalle-pedido-delete-popup',
    template: ''
})
export class DetallePedidoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detallePedidoPopupService: DetallePedidoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.detallePedidoPopupService
                .open(DetallePedidoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
