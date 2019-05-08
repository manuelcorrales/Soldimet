import { Component, OnInit, Input, Output, ViewChild, Injectable, ViewContainerRef } from '@angular/core';
import { DtoPedidoCabecera } from 'app/dto/dto-pedidos/dto-pedido-cabecera';
import { PedidosService } from 'app/pedidos/pedidos-services';
import { EventEmitter } from 'events';
import { NgbModalRef, NgbModal } from '../../../../../node_modules/@ng-bootstrap/ng-bootstrap';
import { Router } from '../../../../../node_modules/@angular/router';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto';
import { PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';

@Component({
    selector: 'jhi-pedidos',
    templateUrl: './pedidos.component.html',
    styles: ['.pedidos-style.css']
})
export class PedidosComponent implements OnInit {
    @ViewChild('toastr', { read: ViewContainerRef })
    toastrContainer: ViewContainerRef;

    pedidos: DtoPedidoCabecera[];

    constructor(private newPedidoService: PedidosService) {}

    ngOnInit() {
        this.newPedidoService.getPedidosCabecera().subscribe((pedidos: DtoPedidoCabecera[]) => {
            this.pedidos = pedidos;
        });
    }

    verPedido(id: number) {}

    onSearch(searchValue) {}
}

@Injectable()
export class PedidoModalPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private pedidoEntityService: PedidoRepuestoService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }
            this.pedidoEntityService.find(id).subscribe(pedido => {
                this.ngbModalRef = this.pedidoModalRef(component, pedido.body);
                resolve(this.ngbModalRef);
            });
        });
    }

    pedidoModalRef(component: Component, pedido: PedidoRepuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.pedido = pedido;
        modalRef.result.then(
            result => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
                this.ngbModalRef = null;
            },
            reason => {
                this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true });
                this.ngbModalRef = null;
            }
        );
        return modalRef;
    }
}
