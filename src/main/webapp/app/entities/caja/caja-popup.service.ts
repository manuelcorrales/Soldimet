import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { DatePipe } from '@angular/common';
import { Caja } from './caja.model';
import { CajaService } from './caja.service';

@Injectable()
export class CajaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private datePipe: DatePipe, private modalService: NgbModal, private router: Router, private cajaService: CajaService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cajaService.find(id).subscribe(caja => {
                    if (caja.fecha) {
                        caja.fecha = {
                            year: caja.fecha.getFullYear(),
                            month: caja.fecha.getMonth() + 1,
                            day: caja.fecha.getDate()
                        };
                    }
                    caja.horaApertura = this.datePipe.transform(caja.horaApertura, 'yyyy-MM-ddTHH:mm:ss');
                    caja.horaCierre = this.datePipe.transform(caja.horaCierre, 'yyyy-MM-ddTHH:mm:ss');
                    this.ngbModalRef = this.cajaModalRef(component, caja);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cajaModalRef(component, new Caja());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cajaModalRef(component: Component, caja: Caja): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.caja = caja;
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
