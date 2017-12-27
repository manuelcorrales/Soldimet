import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstadoPedidoRepuesto } from './estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Injectable()
export class EstadoPedidoRepuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService

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
                this.estadoPedidoRepuestoService.find(id).subscribe((estadoPedidoRepuesto) => {
                    this.ngbModalRef = this.estadoPedidoRepuestoModalRef(component, estadoPedidoRepuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estadoPedidoRepuestoModalRef(component, new EstadoPedidoRepuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estadoPedidoRepuestoModalRef(component: Component, estadoPedidoRepuesto: EstadoPedidoRepuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.estadoPedidoRepuesto = estadoPedidoRepuesto;
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
