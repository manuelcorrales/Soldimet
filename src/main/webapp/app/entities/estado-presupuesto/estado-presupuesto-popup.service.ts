import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstadoPresupuesto } from './estado-presupuesto.model';
import { EstadoPresupuestoService } from './estado-presupuesto.service';

@Injectable()
export class EstadoPresupuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private estadoPresupuestoService: EstadoPresupuestoService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.estadoPresupuestoService.find(id).subscribe(estadoPresupuesto => {
                    this.ngbModalRef = this.estadoPresupuestoModalRef(component, estadoPresupuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estadoPresupuestoModalRef(component, new EstadoPresupuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estadoPresupuestoModalRef(component: Component, estadoPresupuesto: EstadoPresupuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.estadoPresupuesto = estadoPresupuesto;
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
