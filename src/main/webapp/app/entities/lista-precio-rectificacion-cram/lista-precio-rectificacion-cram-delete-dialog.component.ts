import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-delete-dialog',
    templateUrl: './lista-precio-rectificacion-cram-delete-dialog.component.html'
})
export class ListaPrecioRectificacionCRAMDeleteDialogComponent {
    listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM;

    constructor(
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listaPrecioRectificacionCRAMService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'listaPrecioRectificacionCRAMListModification',
                content: 'Deleted an listaPrecioRectificacionCRAM'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-delete-popup',
    template: ''
})
export class ListaPrecioRectificacionCRAMDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ListaPrecioRectificacionCRAMDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
