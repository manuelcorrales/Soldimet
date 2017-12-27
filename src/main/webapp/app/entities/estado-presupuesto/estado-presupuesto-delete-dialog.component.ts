import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoPresupuesto } from './estado-presupuesto.model';
import { EstadoPresupuestoPopupService } from './estado-presupuesto-popup.service';
import { EstadoPresupuestoService } from './estado-presupuesto.service';

@Component({
    selector: 'jhi-estado-presupuesto-delete-dialog',
    templateUrl: './estado-presupuesto-delete-dialog.component.html'
})
export class EstadoPresupuestoDeleteDialogComponent {

    estadoPresupuesto: EstadoPresupuesto;

    constructor(
        private estadoPresupuestoService: EstadoPresupuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoPresupuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoPresupuestoListModification',
                content: 'Deleted an estadoPresupuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-presupuesto-delete-popup',
    template: ''
})
export class EstadoPresupuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoPresupuestoPopupService: EstadoPresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoPresupuestoPopupService
                .open(EstadoPresupuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
