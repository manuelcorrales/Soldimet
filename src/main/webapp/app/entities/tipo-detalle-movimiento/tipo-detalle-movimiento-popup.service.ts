import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { TipoDetalleMovimiento } from './tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from './tipo-detalle-movimiento.service';

@Injectable()
export class TipoDetalleMovimientoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService
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
                this.tipoDetalleMovimientoService.find(id).subscribe(tipoDetalleMovimiento => {
                    this.ngbModalRef = this.tipoDetalleMovimientoModalRef(component, tipoDetalleMovimiento);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.tipoDetalleMovimientoModalRef(component, new TipoDetalleMovimiento());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    tipoDetalleMovimientoModalRef(component: Component, tipoDetalleMovimiento: TipoDetalleMovimiento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.tipoDetalleMovimiento = tipoDetalleMovimiento;
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
