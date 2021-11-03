import { PedidoRepuesto } from './../../../entities/pedido-repuesto/pedido-repuesto.model';
import { IMedidaArticulo } from './../../../entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from './../../../entities/medida-articulo/service/medida-articulo.service';
import { EventManager } from './../../../core/util/event-manager.service';
import { Component, OnInit, ViewChildren, QueryList, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { ActivatedRoute } from '@angular/router';
import { PedidoModalPopupService } from 'app/pedidos/pedidos.component';
import { DetallePedidoNewComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/detalle-pedido.component';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { filter, map } from 'rxjs/operators';

@Component({
  selector: 'jhi-pedido-pendiente',
  templateUrl: './pedido-pendiente.component.html',
})
export class PedidoPendienteComponent implements OnInit {
  pedido!: PedidoRepuesto;
  @ViewChildren('detPed')
  detallePedidoComponent: QueryList<DetallePedidoNewComponent> | undefined;

  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef | undefined;

  isSaving = false;
  medidas: IMedidaArticulo[] = [];

  constructor(
    private pedidosServices: PedidosService,
    private activeModal: NgbActiveModal,
    private eventManager: EventManager,
    private medidaService: MedidaArticuloService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.medidaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMedidaArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedidaArticulo[]>) => response.body ?? [])
      )
      .subscribe((res: IMedidaArticulo[]) => (this.medidas = res));
  }

  guardarPedidoPendiente() {
    this.isSaving = true;
    this.subscribeToSavePedido(this.pedidosServices.updatePedido(this.pedido));
  }

  clear() {
    this.activeModal.dismiss('cancel');
  }

  private subscribeToSavePedido(result: Observable<HttpResponse<PedidoRepuesto>>) {
    result.subscribe(
      (res: HttpResponse<PedidoRepuesto>) => this.onSavePedidoSuccess(res.body!),
      () => this.onSavePedidoError()
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
}

@Component({
  selector: 'jhi-pedido-pendiente-modal-popup',
  template: '',
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
