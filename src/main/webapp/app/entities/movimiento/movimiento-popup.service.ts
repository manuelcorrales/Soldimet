import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Movimiento } from './movimiento.model';
import { MovimientoService } from './movimiento.service';

@Injectable()
export class MovimientoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private datePipe: DatePipe,
        private modalService: NgbModal,
        private router: Router,
        private movimientoService: MovimientoService
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
                this.movimientoService.find(id).subscribe(movimiento => {
                    if (movimiento.fecha) {
                        movimiento.fecha = {
                            year: movimiento.fecha.getFullYear(),
                            month: movimiento.fecha.getMonth() + 1,
                            day: movimiento.fecha.getDate()
                        };
                    }
                    movimiento.hora = this.datePipe.transform(movimiento.hora, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.movimientoModalRef(component, movimiento);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.movimientoModalRef(component, new Movimiento());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    movimientoModalRef(component: Component, movimiento: Movimiento): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.movimiento = movimiento;
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
