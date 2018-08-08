import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListaPrecioDesdeHasta } from './lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';

@Injectable()
export class ListaPrecioDesdeHastaPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService
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
                this.listaPrecioDesdeHastaService.find(id).subscribe(listaPrecioDesdeHasta => {
                    if (listaPrecioDesdeHasta.fechaDesde) {
                        listaPrecioDesdeHasta.fechaDesde = {
                            year: listaPrecioDesdeHasta.fechaDesde.getFullYear(),
                            month: listaPrecioDesdeHasta.fechaDesde.getMonth() + 1,
                            day: listaPrecioDesdeHasta.fechaDesde.getDate()
                        };
                    }
                    if (listaPrecioDesdeHasta.fechaHasta) {
                        listaPrecioDesdeHasta.fechaHasta = {
                            year: listaPrecioDesdeHasta.fechaHasta.getFullYear(),
                            month: listaPrecioDesdeHasta.fechaHasta.getMonth() + 1,
                            day: listaPrecioDesdeHasta.fechaHasta.getDate()
                        };
                    }
                    this.ngbModalRef = this.listaPrecioDesdeHastaModalRef(component, listaPrecioDesdeHasta);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.listaPrecioDesdeHastaModalRef(component, new ListaPrecioDesdeHasta());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    listaPrecioDesdeHastaModalRef(component: Component, listaPrecioDesdeHasta: ListaPrecioDesdeHasta): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static' });
        modalRef.componentInstance.listaPrecioDesdeHasta = listaPrecioDesdeHasta;
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
