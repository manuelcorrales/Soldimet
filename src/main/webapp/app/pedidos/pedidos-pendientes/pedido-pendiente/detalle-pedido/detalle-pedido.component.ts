import { Component, OnInit, Input, QueryList, ViewChildren } from '@angular/core';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { CostoRepuestoComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/detalle-pedido/costo-repuesto/costo-repuesto.component';

@Component({
    selector: 'jhi-detalle-pedido',
    templateUrl: './detalle-pedido.component.html',
    styles: []
})
export class DetallePedidoComponent implements OnInit {
    @Input()
    detallePedido: DetallePedido;
    @Input()
    proveedores: Proveedor[];
    @ViewChildren('costoRepuestoComponent')
    costosRepuestoComponent: QueryList<CostoRepuestoComponent>;

    constructor() {}

    ngOnInit() {}

    public updateCostoRepuestos() {
        this.costosRepuestoComponent.forEach((costoRepuestoComponent: CostoRepuestoComponent) => {
            const costoRepuesto = costoRepuestoComponent.getCostoRepuesto();
            if (costoRepuesto.proveedor != null && costoRepuesto.valor != null) {
                this.detallePedido.costoRepuestos.push(costoRepuesto);
            }
        });
    }
}
