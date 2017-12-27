import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { EstadoMovimiento } from './estado-movimiento.model';
import { EstadoMovimientoPopupService } from './estado-movimiento-popup.service';
import { EstadoMovimientoService } from './estado-movimiento.service';

@Component({
    selector: 'jhi-estado-movimiento-delete-dialog',
    templateUrl: './estado-movimiento-delete-dialog.component.html'
})
export class EstadoMovimientoDeleteDialogComponent {

    estadoMovimiento: EstadoMovimiento;

    constructor(
        private estadoMovimientoService: EstadoMovimientoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoMovimientoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'estadoMovimientoListModification',
                content: 'Deleted an estadoMovimiento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-movimiento-delete-popup',
    template: ''
})
export class EstadoMovimientoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private estadoMovimientoPopupService: EstadoMovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.estadoMovimientoPopupService
                .open(EstadoMovimientoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
