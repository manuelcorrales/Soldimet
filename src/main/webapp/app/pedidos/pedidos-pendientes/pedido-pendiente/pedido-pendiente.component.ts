import { Component, OnInit, ViewChildren, QueryList, OnDestroy, ViewChild, ViewContainerRef } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { JhiEventManager } from '../../../../../../../node_modules/ng-jhipster';
import { ActivatedRoute } from '../../../../../../../node_modules/@angular/router';
import { PedidoModalPopupService } from 'app/pedidos/pedidos.component';
import { DetallePedidoComponentNew } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/detalle-pedido.component';
import { HttpResponse } from '../../../../../../../node_modules/@angular/common/http';
import { Observable } from '../../../../../../../node_modules/rxjs';
import { NgbActiveModal } from '../../../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { DtoBusquedaProveedor } from 'app/dto/dto-pedidos/dto-proveedor-search';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { ArticuloService } from 'app/entities/articulo';
import { MarcaService } from 'app/entities/marca';
import { IMarca } from 'app/shared/model/marca.model';
import { IArticulo } from 'app/shared/model/articulo.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto';
import { TipoRepuesto, ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';

@Component({
    selector: 'jhi-pedido-pendiente',
    templateUrl: './pedido-pendiente.component.html',
    styles: ['./collapsable.css']
})
export class PedidoPendienteComponent implements OnInit {
    pedido: PedidoRepuesto;
    proveedores: DtoBusquedaProveedor[];
    @ViewChildren('detPed')
    detallePedidoComponent: QueryList<DetallePedidoComponentNew>;

    @ViewChild('toastr', { read: ViewContainerRef })
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
                if (detalle.tipoParteMotor.id == tipoRepuestoI.tipoParteMotor.id) {
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
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
