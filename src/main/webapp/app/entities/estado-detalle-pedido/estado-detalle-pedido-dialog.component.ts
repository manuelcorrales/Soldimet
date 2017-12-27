import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoDetallePedido } from './estado-detalle-pedido.model';
import { EstadoDetallePedidoPopupService } from './estado-detalle-pedido-popup.service';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
    selector: 'jhi-estado-detalle-pedido-dialog',
    templateUrl: './estado-detalle-pedido-dialog.component.html'
})
export class EstadoDetallePedidoDialogComponent implements OnInit {

    estadoDetallePedido: EstadoDetallePedido;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoDetallePedidoService: EstadoDetallePedidoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.estadoDetallePedido.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoDetallePedidoService.update(this.estadoDetallePedido));
        } else {
            this.subscribeToSaveResponse(
                this.estadoDetallePedidoService.create(this.estadoDetallePedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoDetallePedido>) {
        result.subscribe((res: EstadoDetallePedido) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoDetallePedido) {
        this.eventManager.broadcast({ name: 'estadoDetallePedidoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-estado-detalle-pedido-popup',
    template: ''
})
export class EstadoDetallePedidoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoDetallePedidoPopupService: EstadoDetallePedidoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoDetallePedidoPopupService
                    .open(EstadoDetallePedidoDialogComponent as Component, params['id']);
            } else {
                this.estadoDetallePedidoPopupService
                    .open(EstadoDetallePedidoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
