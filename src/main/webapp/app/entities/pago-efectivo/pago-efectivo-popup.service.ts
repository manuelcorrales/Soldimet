import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagoEfectivo } from './pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';

@Injectable()
export class PagoEfectivoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pagoEfectivoService: PagoEfectivoService

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
                this.pagoEfectivoService.find(id).subscribe((pagoEfectivo) => {
                    this.ngbModalRef = this.pagoEfectivoModalRef(component, pagoEfectivo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pagoEfectivoModalRef(component, new PagoEfectivo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pagoEfectivoModalRef(component: Component, pagoEfectivo: PagoEfectivo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pagoEfectivo = pagoEfectivo;
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
