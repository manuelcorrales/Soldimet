import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PedidoRepuesto } from './pedido-repuesto.model';
import { PedidoRepuestoService } from './pedido-repuesto.service';

@Injectable()
export class PedidoRepuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pedidoRepuestoService: PedidoRepuestoService

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
                this.pedidoRepuestoService.find(id).subscribe((pedidoRepuesto) => {
                    if (pedidoRepuesto.fechaCreacion) {
                        pedidoRepuesto.fechaCreacion = {
                            year: pedidoRepuesto.fechaCreacion.getFullYear(),
                            month: pedidoRepuesto.fechaCreacion.getMonth() + 1,
                            day: pedidoRepuesto.fechaCreacion.getDate()
                        };
                    }
                    if (pedidoRepuesto.fechaPedido) {
                        pedidoRepuesto.fechaPedido = {
                            year: pedidoRepuesto.fechaPedido.getFullYear(),
                            month: pedidoRepuesto.fechaPedido.getMonth() + 1,
                            day: pedidoRepuesto.fechaPedido.getDate()
                        };
                    }
                    if (pedidoRepuesto.fechaRecibo) {
                        pedidoRepuesto.fechaRecibo = {
                            year: pedidoRepuesto.fechaRecibo.getFullYear(),
                            month: pedidoRepuesto.fechaRecibo.getMonth() + 1,
                            day: pedidoRepuesto.fechaRecibo.getDate()
                        };
                    }
                    this.ngbModalRef = this.pedidoRepuestoModalRef(component, pedidoRepuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pedidoRepuestoModalRef(component, new PedidoRepuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pedidoRepuestoModalRef(component: Component, pedidoRepuesto: PedidoRepuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pedidoRepuesto = pedidoRepuesto;
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
