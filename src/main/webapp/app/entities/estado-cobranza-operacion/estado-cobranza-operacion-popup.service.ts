import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { EstadoCobranzaOperacion } from './estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Injectable()
export class EstadoCobranzaOperacionPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private estadoCobranzaOperacionService: EstadoCobranzaOperacionService
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
                this.estadoCobranzaOperacionService.find(id).subscribe(estadoCobranzaOperacion => {
                    this.ngbModalRef = this.estadoCobranzaOperacionModalRef(component, estadoCobranzaOperacion);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.estadoCobranzaOperacionModalRef(component, new EstadoCobranzaOperacion());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    estadoCobranzaOperacionModalRef(component: Component, estadoCobranzaOperacion: EstadoCobranzaOperacion): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.estadoCobranzaOperacion = estadoCobranzaOperacion;
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
