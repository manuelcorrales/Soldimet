import { Component, OnInit } from '@angular/core';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

@Component({
    selector: 'jhi-pedidos-pendientes',
    templateUrl: './pedidos-pendientes.component.html',
    styles: []
})
export class PedidosPendientesComponent implements OnInit {
    pedidos: PedidoRepuesto[];
    proveedores: Proveedor[];

    constructor(private pedidosServices: PedidosService) {}

    ngOnInit() {
        this.pedidosServices.getPedidosPendientes().subscribe((pedidos: PedidoRepuesto[]) => {
            this.pedidos = pedidos;
            console.log(this.pedidos);
        });

        this.pedidosServices.getProveedoresRepuestos().subscribe((proveedores: Proveedor[]) => {
            this.proveedores = proveedores;
            console.log(this.proveedores);
        });
    }
}
