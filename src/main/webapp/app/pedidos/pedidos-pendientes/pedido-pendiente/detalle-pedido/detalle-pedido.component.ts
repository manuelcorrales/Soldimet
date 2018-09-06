import { Component, OnInit, Input } from '@angular/core';
import { DetallePedido } from 'app/shared/model/detalle-pedido.model';
import { Proveedor } from 'app/shared/model/proveedor.model';

@Component({
    selector: 'jhi-detalle-pedido',
    templateUrl: './detalle-pedido.component.html',
    styles: []
})
export class DetallePedidoComponent implements OnInit {
    @Input() detallePedido: DetallePedido;
    @Input() proveedores: Proveedor[];

    constructor() {}

    ngOnInit() {}
}
