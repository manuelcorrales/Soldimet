import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { CobranzaOperacion } from './cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';

@Injectable()
export class CobranzaOperacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(private modalService: NgbModal, private router: Router, private cobranzaOperacionService: CobranzaOperacionService) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.cobranzaOperacionService.find(id).subscribe(cobranzaOperacion => {
                    this.ngbModalRef = this.cobranzaOperacionModalRef(component, cobranzaOperacion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.cobranzaOperacionModalRef(component, new CobranzaOperacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    cobranzaOperacionModalRef(component: Component, cobranzaOperacion: CobranzaOperacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.cobranzaOperacion = cobranzaOperacion;
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
