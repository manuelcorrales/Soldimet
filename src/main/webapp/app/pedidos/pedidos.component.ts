import { Component, OnInit, Input, Output, ViewChild } from '@angular/core';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { EventEmitter } from 'events';

@Component({
    selector: 'jhi-pedidos',
    templateUrl: './pedidos.component.html',
    styles: ['.pedidos-style.css']
})
export class PedidosComponent implements OnInit {
    columns = [
        {
            prop: 'id',
            name: 'Nº Pedido',
            draggable: false
        },
        {
            name: 'Fecha',
            draggable: false
        },
        {
            name: 'PresupuestoId',
            draggable: false
        },
        {
            name: 'Cliente',
            draggable: false
        },
        {
            name: 'Motor',
            draggable: false
        },
        {
            name: 'Tipo',
            draggable: false
        },
        {
            name: 'Estado',
            draggable: false
        },
        {
            name: 'Acciones',
            draggable: false
        }
    ];

    pedidos: DtoPedidoCabecera[];

    constructor(private newPedidoService: PedidosService) {}

    ngOnInit() {
        this.newPedidoService.getPedidosCabecera().subscribe((pedidos: DtoPedidoCabecera[]) => {
            this.pedidos = pedidos;
        });
    }

    verPedido(id: number) {}
}
