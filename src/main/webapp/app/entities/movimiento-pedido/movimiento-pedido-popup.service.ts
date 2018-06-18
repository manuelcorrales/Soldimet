import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MovimientoPedido } from './movimiento-pedido.model';
import { MovimientoPedidoService } from './movimiento-pedido.service';

@Injectable()
export class MovimientoPedidoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private movimientoPedidoService: MovimientoPedidoService

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
                this.movimientoPedidoService.find(id).subscribe((movimientoPedido) => {
                    this.ngbModalRef = this.movimientoPedidoModalRef(component, movimientoPedido);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.movimientoPedidoModalRef(component, new MovimientoPedido());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    movimientoPedidoModalRef(component: Component, movimientoPedido: MovimientoPedido): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.movimientoPedido = movimientoPedido;
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
