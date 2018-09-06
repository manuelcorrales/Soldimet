import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { MovimientoArticuloService } from 'app/entities/movimiento-articulo/movimiento-articulo.service';

@Component({
    selector: 'jhi-movimiento-articulo-delete-dialog',
    templateUrl: './movimiento-articulo-delete-dialog.component.html'
})
export class MovimientoArticuloDeleteDialogComponent {
    movimientoArticulo: IMovimientoArticulo;

    constructor(
        private movimientoArticuloService: MovimientoArticuloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movimientoArticuloService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'movimientoArticuloListModification',
                content: 'Deleted an movimientoArticulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movimiento-articulo-delete-popup',
    template: ''
})
export class MovimientoArticuloDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movimientoArticulo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MovimientoArticuloDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.movimientoArticulo = movimientoArticulo;
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
