import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { PedidoRepuesto } from './pedido-repuesto.model';
import { PedidoRepuestoPopupService } from './pedido-repuesto-popup.service';
import { PedidoRepuestoService } from './pedido-repuesto.service';
import { EstadoPedidoRepuesto, EstadoPedidoRepuestoService } from '../estado-pedido-repuesto';
import { Presupuesto, PresupuestoService } from '../presupuesto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-pedido-repuesto-dialog',
    templateUrl: './pedido-repuesto-dialog.component.html'
})
export class PedidoRepuestoDialogComponent implements OnInit {
    pedidoRepuesto: PedidoRepuesto;
    isSaving: boolean;

    estadopedidorepuestos: EstadoPedidoRepuesto[];

    presupuestos: Presupuesto[];
    fechaCreacionDp: any;
    fechaPedidoDp: any;
    fechaReciboDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private pedidoRepuestoService: PedidoRepuestoService,
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
        private presupuestoService: PresupuestoService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.estadoPedidoRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.estadopedidorepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.presupuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.presupuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.pedidoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.pedidoRepuestoService.update(this.pedidoRepuesto));
        } else {
            this.subscribeToSaveResponse(this.pedidoRepuestoService.create(this.pedidoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<PedidoRepuesto>) {
        result.subscribe((res: PedidoRepuesto) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: PedidoRepuesto) {
        this.eventManager.broadcast({ name: 'pedidoRepuestoListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEstadoPedidoRepuestoById(index: number, item: EstadoPedidoRepuesto) {
        return item.id;
    }

    trackPresupuestoById(index: number, item: Presupuesto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-pedido-repuesto-popup',
    template: ''
})
export class PedidoRepuestoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private pedidoRepuestoPopupService: PedidoRepuestoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.pedidoRepuestoPopupService.open(PedidoRepuestoDialogComponent as Component, params['id']);
            } else {
                this.pedidoRepuestoPopupService.open(PedidoRepuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
