import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostoRepuesto } from './costo-repuesto.model';
import { CostoRepuestoPopupService } from './costo-repuesto-popup.service';
import { CostoRepuestoService } from './costo-repuesto.service';

@Component({
    selector: 'jhi-costo-repuesto-delete-dialog',
    templateUrl: './costo-repuesto-delete-dialog.component.html'
})
export class CostoRepuestoDeleteDialogComponent {

    costoRepuesto: CostoRepuesto;

    constructor(
        private costoRepuestoService: CostoRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costoRepuestoService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costoRepuestoListModification',
                content: 'Deleted an costoRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-costo-repuesto-delete-popup',
    template: ''
})
export class CostoRepuestoDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoRepuestoPopupService: CostoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costoRepuestoPopupService
                .open(CostoRepuestoDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
