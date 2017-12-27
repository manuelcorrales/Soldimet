import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoPedidoRepuesto } from './estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoPopupService } from './estado-pedido-repuesto-popup.service';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
    selector: 'jhi-estado-pedido-repuesto-dialog',
    templateUrl: './estado-pedido-repuesto-dialog.component.html'
})
export class EstadoPedidoRepuestoDialogComponent implements OnInit {

    estadoPedidoRepuesto: EstadoPedidoRepuesto;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
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
        if (this.estadoPedidoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.estadoPedidoRepuestoService.update(this.estadoPedidoRepuesto));
        } else {
            this.subscribeToSaveResponse(
                this.estadoPedidoRepuestoService.create(this.estadoPedidoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoPedidoRepuesto>) {
        result.subscribe((res: EstadoPedidoRepuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoPedidoRepuesto) {
        this.eventManager.broadcast({ name: 'estadoPedidoRepuestoListModification', content: 'OK'});
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
    selector: 'jhi-estado-pedido-repuesto-popup',
    template: ''
})
export class EstadoPedidoRepuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPedidoRepuestoPopupService: EstadoPedidoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.estadoPedidoRepuestoPopupService
                    .open(EstadoPedidoRepuestoDialogComponent as Component, params['id']);
            } else {
                this.estadoPedidoRepuestoPopupService
                    .open(EstadoPedidoRepuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
