import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { MovimientoPresupuesto } from './movimiento-presupuesto.model';
import { MovimientoPresupuestoPopupService } from './movimiento-presupuesto-popup.service';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';

@Component({
    selector: 'jhi-movimiento-presupuesto-delete-dialog',
    templateUrl: './movimiento-presupuesto-delete-dialog.component.html'
})
export class MovimientoPresupuestoDeleteDialogComponent {

    movimientoPresupuesto: MovimientoPresupuesto;

    constructor(
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movimientoPresupuestoService.delete(id).subscribe((response) => {
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

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoPresupuestoPopupService: MovimientoPresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.movimientoPresupuestoPopupService
                .open(MovimientoPresupuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
