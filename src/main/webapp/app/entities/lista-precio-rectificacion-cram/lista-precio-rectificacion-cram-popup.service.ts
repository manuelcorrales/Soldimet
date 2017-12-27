import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { ListaPrecioRectificacionCRAM } from './lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';

@Injectable()
export class ListaPrecioRectificacionCRAMPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService

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
                this.listaPrecioRectificacionCRAMService.find(id).subscribe((listaPrecioRectificacionCRAM) => {
                    if (listaPrecioRectificacionCRAM.fechaVigenciaDesde) {
                        listaPrecioRectificacionCRAM.fechaVigenciaDesde = {
                            year: listaPrecioRectificacionCRAM.fechaVigenciaDesde.getFullYear(),
                            month: listaPrecioRectificacionCRAM.fechaVigenciaDesde.getMonth() + 1,
                            day: listaPrecioRectificacionCRAM.fechaVigenciaDesde.getDate()
                        };
                    }
                    if (listaPrecioRectificacionCRAM.fechaVigenciaHasta) {
                        listaPrecioRectificacionCRAM.fechaVigenciaHasta = {
                            year: listaPrecioRectificacionCRAM.fechaVigenciaHasta.getFullYear(),
                            month: listaPrecioRectificacionCRAM.fechaVigenciaHasta.getMonth() + 1,
                            day: listaPrecioRectificacionCRAM.fechaVigenciaHasta.getDate()
                        };
                    }
                    this.ngbModalRef = this.listaPrecioRectificacionCRAMModalRef(component, listaPrecioRectificacionCRAM);
                    resolve(this.ngbModalRef);
                });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.listaPrecioRectificacionCRAMModalRef(component, new ListaPrecioRectificacionCRAM());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    listaPrecioRectificacionCRAMModalRef(component: Component, listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
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
