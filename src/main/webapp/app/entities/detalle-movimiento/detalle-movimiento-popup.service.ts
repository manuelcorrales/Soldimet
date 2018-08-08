import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DetalleMovimiento } from './detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';

@Injectable()
export class DetalleMovimientoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private detalleMovimientoService: DetalleMovimientoService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.detalleMovimientoService.find(id).subscribe(detalleMovimiento => {
                    this.ngbModalRef = this.detalleMovimientoModalRef(component, detalleMovimiento);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.detalleMovimientoModalRef(component, new DetalleMovimiento());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    detalleMovimientoModalRef(component: Component, detalleMovimiento: DetalleMovimiento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.detalleMovimiento = detalleMovimiento;
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
