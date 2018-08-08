import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagoTarjeta } from './pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';

@Injectable()
export class PagoTarjetaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private pagoTarjetaService: PagoTarjetaService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.pagoTarjetaService.find(id).subscribe(pagoTarjeta => {
                    this.ngbModalRef = this.pagoTarjetaModalRef(component, pagoTarjeta);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pagoTarjetaModalRef(component, new PagoTarjeta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pagoTarjetaModalRef(component: Component, pagoTarjeta: PagoTarjeta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.pagoTarjeta = pagoTarjeta;
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
