import { Component, OnInit, ViewChildren, QueryList, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { JhiEventManager } from 'ng-jhipster';
import { ActivatedRoute } from '@angular/router';
import { PedidoModalPopupService } from 'app/pedidos/pedidos.component';
import { DetallePedidoNewComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/detalle-pedido.component';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'jhi-pedido-pendiente',
  templateUrl: './pedido-pendiente.component.html'
})
export class PedidoPendienteComponent implements OnInit {
  pedido: PedidoRepuesto;
  @ViewChildren('detPed')
  detallePedidoComponent: QueryList<DetallePedidoNewComponent>;

  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  isSaving = false;

  constructor(private pedidosServices: PedidosService, private activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

  ngOnInit() {
    this.isSaving = false;
  }

  guardarPedidoPendiente() {
    this.isSaving = true;
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
      }
    });
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
