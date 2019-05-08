import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';

@Component({
    selector: 'jhi-detalle-movimiento-delete-dialog',
    templateUrl: './detalle-movimiento-delete-dialog.component.html'
})
export class DetalleMovimientoDeleteDialogComponent {
    detalleMovimiento: IDetalleMovimiento;

    constructor(
        private detalleMovimientoService: DetalleMovimientoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.detalleMovimientoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'detalleMovimientoListModification',
                content: 'Deleted an detalleMovimiento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-detalle-movimiento-delete-popup',
    template: ''
})
export class DetalleMovimientoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ detalleMovimiento }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(DetalleMovimientoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.detalleMovimiento = detalleMovimiento;
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
