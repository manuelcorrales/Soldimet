import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoTarjeta } from './tipo-tarjeta.model';
import { TipoTarjetaService } from './tipo-tarjeta.service';

@Injectable()
export class TipoTarjetaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private tipoTarjetaService: TipoTarjetaService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.tipoTarjetaService.find(id).subscribe(tipoTarjeta => {
                    this.ngbModalRef = this.tipoTarjetaModalRef(component, tipoTarjeta);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoTarjetaModalRef(component, new TipoTarjeta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoTarjetaModalRef(component: Component, tipoTarjeta: TipoTarjeta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.tipoTarjeta = tipoTarjeta;
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
