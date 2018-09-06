import { Component, OnInit, Input } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { Proveedor } from 'app/shared/model/proveedor.model';

@Component({
    selector: 'jhi-pedido-pendiente',
    templateUrl: './pedido-pendiente.component.html',
    styles: []
})
export class PedidoPendienteComponent implements OnInit {
    @Input() pedido: PedidoRepuesto;
    @Input() proveedores: Proveedor;

    constructor() {}

    ngOnInit() {}
}
