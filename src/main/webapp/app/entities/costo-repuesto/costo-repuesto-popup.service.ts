import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CostoRepuesto } from './costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';

@Injectable()
export class CostoRepuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private costoRepuestoService: CostoRepuestoService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.costoRepuestoService.find(id).subscribe(costoRepuesto => {
                    this.ngbModalRef = this.costoRepuestoModalRef(component, costoRepuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.costoRepuestoModalRef(component, new CostoRepuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    costoRepuestoModalRef(component: Component, costoRepuesto: CostoRepuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.costoRepuesto = costoRepuesto;
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
