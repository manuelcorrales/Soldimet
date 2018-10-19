import { Component, OnInit, ViewChildren, QueryList, OnDestroy } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { JhiAlertService, JhiEventManager } from '../../../../../../../node_modules/ng-jhipster';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { PedidoModalPopupService } from 'app/pedidos/pedidos.component';
import { DetallePedidoComponentNew } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/detalle-pedido.component';
import { HttpResponse } from '../../../../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../../../../node_modules/rxjs';
import { NgbActiveModal } from '../../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-pedido-pendiente',
    templateUrl: './pedido-pendiente.component.html',
    styles: ['./collapsable.css']
})
export class PedidoPendienteComponent implements OnInit {
    pedido: PedidoRepuesto;
    proveedores: Proveedor;
    @ViewChildren('detPed')
    detallePedidoComponent: QueryList<DetallePedidoComponentNew>;

    isSaving = false;

    constructor(private pedidosServices: PedidosService, private activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    ngOnInit() {
        this.isSaving = false;
    }

    guardarPedidoPendiente() {
        this.isSaving = true;
        this.detallePedidoComponent.forEach((detalle: DetallePedidoComponentNew) => detalle.updateCostoRepuestos());
        this.subscribeToSavePedido(this.pedidosServices.updatePedido(this.pedido));
    }

    private subscribeToSavePedido(result: Observable<HttpResponse<PedidoRepuesto>>) {
        result.subscribe(
            (res: HttpResponse<PedidoRepuesto>) => this.onSavePedidoSuccess(res.body),
            (res: Response) => this.onSavePedidoError()
        );
    }

    private onSavePedidoSuccess(result: PedidoRepuesto) {
        this.pedido = result;
        this.eventManager.broadcast({ name: 'pedidoListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSavePedidoError() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }
}

@Component({
    selector: 'jhi-pedido-pendiente-modal-popup',
    template: ''
})
export class PedidoPendienteModalPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private pedidoPendientePopupService: PedidoModalPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.pedidoPendientePopupService.open(PedidoPendienteComponent as Component, params['id']);
            } else {
                console.log('No entro en el if de PedidosPendientesComponent');
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
