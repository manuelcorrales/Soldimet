import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { PagoCheque } from './pago-cheque.model';
import { PagoChequeService } from './pago-cheque.service';

@Injectable()
export class PagoChequePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private pagoChequeService: PagoChequeService

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
                this.pagoChequeService.find(id).subscribe((pagoCheque) => {
                    if (pagoCheque.fechaCobro) {
                        pagoCheque.fechaCobro = {
                            year: pagoCheque.fechaCobro.getFullYear(),
                            month: pagoCheque.fechaCobro.getMonth() + 1,
                            day: pagoCheque.fechaCobro.getDate()
                        };
                    }
                    if (pagoCheque.fechaRecibo) {
                        pagoCheque.fechaRecibo = {
                            year: pagoCheque.fechaRecibo.getFullYear(),
                            month: pagoCheque.fechaRecibo.getMonth() + 1,
                            day: pagoCheque.fechaRecibo.getDate()
                        };
                    }
                    this.ngbModalRef = this.pagoChequeModalRef(component, pagoCheque);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.pagoChequeModalRef(component, new PagoCheque());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    pagoChequeModalRef(component: Component, pagoCheque: PagoCheque): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.pagoCheque = pagoCheque;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
