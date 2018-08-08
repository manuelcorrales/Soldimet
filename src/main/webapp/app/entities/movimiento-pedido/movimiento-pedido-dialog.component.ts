import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MovimientoPedido } from './movimiento-pedido.model';
import { MovimientoPedidoPopupService } from './movimiento-pedido-popup.service';
import { MovimientoPedidoService } from './movimiento-pedido.service';
import { PedidoRepuesto, PedidoRepuestoService } from '../pedido-repuesto';
import { Movimiento, MovimientoService } from '../movimiento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-movimiento-pedido-dialog',
    templateUrl: './movimiento-pedido-dialog.component.html'
})
export class MovimientoPedidoDialogComponent implements OnInit {
    movimientoPedido: MovimientoPedido;
    isSaving: boolean;

    pedidorepuestos: PedidoRepuesto[];

    movimientos: Movimiento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movimientoPedidoService: MovimientoPedidoService,
        private pedidoRepuestoService: PedidoRepuestoService,
        private movimientoService: MovimientoService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.pedidoRepuestoService.query().subscribe(
            (res: ResponseWrapper) => {
                this.pedidorepuestos = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
        this.movimientoService.query({ filter: 'movimientopedido-is-null' }).subscribe(
            (res: ResponseWrapper) => {
                if (!this.movimientoPedido.movimiento || !this.movimientoPedido.movimiento.id) {
                    this.movimientos = res.json;
                } else {
                    this.movimientoService.find(this.movimientoPedido.movimiento.id).subscribe(
                        (subRes: Movimiento) => {
                            this.movimientos = [subRes].concat(res.json);
                        },
                        (subRes: ResponseWrapper) => this.onError(subRes.json)
                    );
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.movimientoPedido.id !== undefined) {
            this.subscribeToSaveResponse(this.movimientoPedidoService.update(this.movimientoPedido));
        } else {
            this.subscribeToSaveResponse(this.movimientoPedidoService.create(this.movimientoPedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<MovimientoPedido>) {
        result.subscribe((res: MovimientoPedido) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MovimientoPedido) {
        this.eventManager.broadcast({ name: 'movimientoPedidoListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPedidoRepuestoById(index: number, item: PedidoRepuesto) {
        return item.id;
    }

    trackMovimientoById(index: number, item: Movimiento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-movimiento-pedido-popup',
    template: ''
})
export class MovimientoPedidoPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private movimientoPedidoPopupService: MovimientoPedidoPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.movimientoPedidoPopupService.open(MovimientoPedidoDialogComponent as Component, params['id']);
            } else {
                this.movimientoPedidoPopupService.open(MovimientoPedidoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
