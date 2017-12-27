import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetallePresupuesto } from './detalle-presupuesto.model';
import { DetallePresupuestoService } from './detalle-presupuesto.service';

@Injectable()
export class DetallePresupuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private detallePresupuestoService: DetallePresupuestoService

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
                this.detallePresupuestoService.find(id).subscribe((detallePresupuesto) => {
                    this.ngbModalRef = this.detallePresupuestoModalRef(component, detallePresupuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.detallePresupuestoModalRef(component, new DetallePresupuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    detallePresupuestoModalRef(component: Component, detallePresupuesto: DetallePresupuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.detallePresupuesto = detallePresupuesto;
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
