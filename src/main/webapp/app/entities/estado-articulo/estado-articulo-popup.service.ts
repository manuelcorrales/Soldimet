import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstadoArticulo } from './estado-articulo.model';
import { EstadoArticuloService } from './estado-articulo.service';

@Injectable()
export class EstadoArticuloPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private estadoArticuloService: EstadoArticuloService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.estadoArticuloService.find(id).subscribe(estadoArticulo => {
                    this.ngbModalRef = this.estadoArticuloModalRef(component, estadoArticulo);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estadoArticuloModalRef(component, new EstadoArticulo());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estadoArticuloModalRef(component: Component, estadoArticulo: EstadoArticulo): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.estadoArticulo = estadoArticulo;
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
