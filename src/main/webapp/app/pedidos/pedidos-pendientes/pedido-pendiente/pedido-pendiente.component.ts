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
import { DtoBusquedaProveedor } from 'app/dto/dto-pedidos/dto-proveedor-search';
import { ArticuloService } from 'app/entities/articulo';
import { MarcaService } from 'app/entities/marca';
import { IMarca } from 'app/shared/model/marca.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

@Component({
  selector: 'jhi-pedido-pendiente',
  templateUrl: './pedido-pendiente.component.html',
  styles: ['./collapsable.css']
})
export class PedidoPendienteComponent implements OnInit {
  pedido: PedidoRepuesto;
  proveedores: DtoBusquedaProveedor[];
  @ViewChildren('detPed')
  detallePedidoComponent: QueryList<DetallePedidoNewComponent>;

  @ViewChild('toastr', { static: false })
  toastrContainer: ViewContainerRef;

  marcas: IMarca[];
  articulos: IArticulo[];
  tiposRepuestos: ITipoRepuesto[];
  isSaving = false;

  constructor(
    private pedidosServices: PedidosService,
    private activeModal: NgbActiveModal,
    private eventManager: JhiEventManager,
    private articuloService: ArticuloService,
    private marcaService: MarcaService,
    private tipoRepuestoService: TipoRepuestoService
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.pedidosServices.getProveedoresRepuestos().subscribe((listaProveedores: DtoBusquedaProveedor[]) => {
      this.proveedores = listaProveedores;
    });
    this.marcaService.query().subscribe((res: HttpResponse<IMarca[]>) => {
      this.marcas = res.body;
    });
    this.tipoRepuestoService.query().subscribe((tiposRepuestos: HttpResponse<ITipoRepuesto[]>) => {
      this.tiposRepuestos = tiposRepuestos.body;
      this.buscarArticulos();
    });
  }
  buscarArticulos() {
    this.pedido.presupuesto.detallePresupuestos.forEach(detalle => {
      let tipoRepuestoID = null;
      this.tiposRepuestos.forEach((tipoRepuestoI: ITipoRepuesto) => {
        if (detalle.tipoParteMotor.id === tipoRepuestoI.tipoParteMotor.id) {
          tipoRepuestoID = tipoRepuestoI.id;
        }
      });
      let query;
      if (tipoRepuestoID) {
        query = {
          'tipoRepuestoId.equals': tipoRepuestoID
        };
      }
      this.articuloService.query(query).subscribe((res: HttpResponse<IArticulo[]>) => {
        this.articulos = res.body;
      });
    });
  }

  guardarPedidoPendiente() {
    this.isSaving = true;
    this.detallePedidoComponent.forEach((detalle: DetallePedidoNewComponent) => detalle.updateCostoRepuestos());
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
