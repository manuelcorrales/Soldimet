import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PrecioRepuesto } from './precio-repuesto.model';
import { PrecioRepuestoService } from './precio-repuesto.service';

@Injectable()
export class PrecioRepuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private precioRepuestoService: PrecioRepuestoService

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
                this.precioRepuestoService.find(id).subscribe((precioRepuesto) => {
                    if (precioRepuesto.fecha) {
                        precioRepuesto.fecha = {
                            year: precioRepuesto.fecha.getFullYear(),
                            month: precioRepuesto.fecha.getMonth() + 1,
                            day: precioRepuesto.fecha.getDate()
                        };
                    }
                    this.ngbModalRef = this.precioRepuestoModalRef(component, precioRepuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.precioRepuestoModalRef(component, new PrecioRepuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    precioRepuestoModalRef(component: Component, precioRepuesto: PrecioRepuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.precioRepuesto = precioRepuesto;
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
