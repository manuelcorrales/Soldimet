import { Component, OnInit, Input, ViewChild, ViewChildren, QueryList } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { JhiAlertService } from '../../../../../../../node_modules/ng-jhipster';
import { DetallePedidoComponent } from 'app/entities/detalle-pedido';

@Component({
    selector: 'jhi-pedido-pendiente',
    templateUrl: './pedido-pendiente.component.html',
    styles: ['./collapsable.css']
})
export class PedidoPendienteComponent implements OnInit {
    @Input()
    pedido: PedidoRepuesto;
    @Input()
    proveedores: Proveedor;
    @ViewChildren('detallePedidoComponent')
    detallePedidoComponent: QueryList<DetallePedidoComponent>;

    constructor(private pedidosServices: PedidosService, private jhiAlertService: JhiAlertService) {}

    ngOnInit() {}

    guardarPedidoPendiente() {
        this.detallePedidoComponent.forEach((detalle: DetallePedidoComponent) => detalle.updateCostoRepuestos());
        this.pedidosServices.updatePedido(this.pedido).subscribe((pedidoSalvado: PedidoRepuesto) => {
            this.pedido = pedidoSalvado;
            this.jhiAlertService.success('Se ha actualizado el pedido número: ' + pedidoSalvado.id, null, null);
        });
    }
}
