import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HistorialPrecio } from './historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';

@Injectable()
export class HistorialPrecioPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private historialPrecioService: HistorialPrecioService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.historialPrecioService.find(id).subscribe(historialPrecio => {
                    if (historialPrecio.fechaHistorial) {
                        historialPrecio.fechaHistorial = {
                            year: historialPrecio.fechaHistorial.getFullYear(),
                            month: historialPrecio.fechaHistorial.getMonth() + 1,
                            day: historialPrecio.fechaHistorial.getDate()
                        };
                    }
                    this.ngbModalRef = this.historialPrecioModalRef(component, historialPrecio);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.historialPrecioModalRef(component, new HistorialPrecio());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    historialPrecioModalRef(component: Component, historialPrecio: HistorialPrecio): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.historialPrecio = historialPrecio;
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
