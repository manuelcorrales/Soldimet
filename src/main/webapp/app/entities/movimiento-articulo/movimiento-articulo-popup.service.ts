import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { MovimientoArticulo } from './movimiento-articulo.model';
import { MovimientoArticuloService } from './movimiento-articulo.service';

@Injectable()
export class MovimientoArticuloPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private movimientoArticuloService: MovimientoArticuloService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.movimientoArticuloService.find(id).subscribe(movimientoArticulo => {
                    this.ngbModalRef = this.movimientoArticuloModalRef(component, movimientoArticulo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.movimientoArticuloModalRef(component, new MovimientoArticulo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    movimientoArticuloModalRef(component: Component, movimientoArticulo: MovimientoArticulo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.movimientoArticulo = movimientoArticulo;
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
