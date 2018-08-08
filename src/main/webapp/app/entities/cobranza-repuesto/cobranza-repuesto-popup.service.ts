import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CobranzaRepuesto } from './cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';

@Injectable()
export class CobranzaRepuestoPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private cobranzaRepuestoService: CobranzaRepuestoService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cobranzaRepuestoService.find(id).subscribe(cobranzaRepuesto => {
                    this.ngbModalRef = this.cobranzaRepuestoModalRef(component, cobranzaRepuesto);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cobranzaRepuestoModalRef(component, new CobranzaRepuesto());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cobranzaRepuestoModalRef(component: Component, cobranzaRepuesto: CobranzaRepuesto): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.cobranzaRepuesto = cobranzaRepuesto;
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
