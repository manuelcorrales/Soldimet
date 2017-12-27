import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstadoDetallePedido } from './estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Injectable()
export class EstadoDetallePedidoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private estadoDetallePedidoService: EstadoDetallePedidoService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.estadoDetallePedidoService.find(id).subscribe((estadoDetallePedido) => {
                    this.ngbModalRef = this.estadoDetallePedidoModalRef(component, estadoDetallePedido);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estadoDetallePedidoModalRef(component, new EstadoDetallePedido());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estadoDetallePedidoModalRef(component: Component, estadoDetallePedido: EstadoDetallePedido): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.estadoDetallePedido = estadoDetallePedido;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
