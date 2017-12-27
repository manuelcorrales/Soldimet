import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Presupuesto } from './presupuesto.model';
import { PresupuestoPopupService } from './presupuesto-popup.service';
import { PresupuestoService } from './presupuesto.service';

@Component({
    selector: 'jhi-presupuesto-delete-dialog',
    templateUrl: './presupuesto-delete-dialog.component.html'
})
export class PresupuestoDeleteDialogComponent {

    presupuesto: Presupuesto;

    constructor(
        private presupuestoService: PresupuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.presupuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'presupuestoListModification',
                content: 'Deleted an presupuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-presupuesto-delete-popup',
    template: ''
})
export class PresupuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private presupuestoPopupService: PresupuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.presupuestoPopupService
                .open(PresupuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
