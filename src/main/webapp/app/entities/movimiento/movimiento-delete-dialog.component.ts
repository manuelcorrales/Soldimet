import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Movimiento } from './movimiento.model';
import { MovimientoPopupService } from './movimiento-popup.service';
import { MovimientoService } from './movimiento.service';

@Component({
    selector: 'jhi-movimiento-delete-dialog',
    templateUrl: './movimiento-delete-dialog.component.html'
})
export class MovimientoDeleteDialogComponent {

    movimiento: Movimiento;

    constructor(
        private movimientoService: MovimientoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.movimientoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'movimientoListModification',
                content: 'Deleted an movimiento'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-movimiento-delete-popup',
    template: ''
})
export class MovimientoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoPopupService: MovimientoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.movimientoPopupService
                .open(MovimientoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
