import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';

@Component({
    selector: 'jhi-movimiento-presupuesto-delete-dialog',
    templateUrl: './movimiento-presupuesto-delete-dialog.component.html'
})
export class MovimientoPresupuestoDeleteDialogComponent {
    movimientoPresupuesto: IMovimientoPresupuesto;

    constructor(
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movimientoPresupuestoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'movimientoPresupuestoListModification',
                content: 'Deleted an movimientoPresupuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movimiento-presupuesto-delete-popup',
    template: ''
})
export class MovimientoPresupuestoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ movimientoPresupuesto }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MovimientoPresupuestoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.movimientoPresupuesto = movimientoPresupuesto;
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
