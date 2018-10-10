import { Component, OnInit } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { PedidosService } from 'app/pedidos/pedidos-services';

@Component({
    selector: 'jhi-pedidos',
    templateUrl: './pedidos.component.html',
    styles: ['.pedidos-style.css']
})
export class PedidosComponent implements OnInit {
    settings = {
        columns: {
            id: {
                title: 'Número',
                editable: false,
                addable: false
            },
            fecha: {
                title: 'Fecha',
                editable: false,
                addable: false
            },
            cliente: {
                title: 'cliente',
                editable: false,
                addable: false
            },
            estado: {
                title: 'Estado',
                editable: false,
                addable: false
            }
        },
        noDataMessage: 'No se encontraron pedidos para mostrar.',
        actions: {
            columnTitle: 'Operaciones',
            add: false,
            edit: false,
            delete: false
        },
        pager: {
            perPage: 20
        }
    };

    pedidos: DtoPedidoCabecera[];

    constructor(private newPedidoService: PedidosService) {}

    ngOnInit() {
        this.newPedidoService.getPedidosCabecera().subscribe((pedidos: DtoPedidoCabecera[]) => {
            this.pedidos = pedidos;
        });
    }
}
