import { Component, OnInit, Injectable, OnDestroy } from '@angular/core';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { Router, ActivatedRoute } from '@angular/router';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { Proveedor } from 'app/shared/model/proveedor.model';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto';
import { PedidoModalPopupService } from 'app/pedidos/pedidos.component';

@Component({
    selector: 'jhi-pedidos-pendientes',
    templateUrl: './pedidos-pendientes.component.html',
    styles: []
})
export class PedidosPendientesComponent implements OnInit {
    constructor() {}

    ngOnInit() {}
}
