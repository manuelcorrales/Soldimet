import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { DetallePedido } from './detalle-pedido.model';
import { DetallePedidoPopupService } from './detalle-pedido-popup.service';
import { DetallePedidoService } from './detalle-pedido.service';
import { Articulo, ArticuloService } from '../articulo';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-detalle-pedido-dialog',
    templateUrl: './detalle-pedido-dialog.component.html'
})
export class DetallePedidoDialogComponent implements OnInit {

    detallePedido: DetallePedido;
    isSaving: boolean;

    articulos: Articulo[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private detallePedidoService: DetallePedidoService,
        private articuloService: ArticuloService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.articuloService.query()
            .subscribe((res: ResponseWrapper) => { this.articulos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.detallePedido.id !== undefined) {
            this.subscribeToSaveResponse(
                this.detallePedidoService.update(this.detallePedido));
        } else {
            this.subscribeToSaveResponse(
                this.detallePedidoService.create(this.detallePedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<DetallePedido>) {
        result.subscribe((res: DetallePedido) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: DetallePedido) {
        this.eventManager.broadcast({ name: 'detallePedidoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArticuloById(index: number, item: Articulo) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-detalle-pedido-popup',
    template: ''
})
export class DetallePedidoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private detallePedidoPopupService: DetallePedidoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.detallePedidoPopupService
                    .open(DetallePedidoDialogComponent as Component, params['id']);
            } else {
                this.detallePedidoPopupService
                    .open(DetallePedidoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
