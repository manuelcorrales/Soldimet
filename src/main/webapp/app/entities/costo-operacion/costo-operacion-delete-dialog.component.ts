import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { CostoOperacion } from './costo-operacion.model';
import { CostoOperacionPopupService } from './costo-operacion-popup.service';
import { CostoOperacionService } from './costo-operacion.service';

@Component({
    selector: 'jhi-costo-operacion-delete-dialog',
    templateUrl: './costo-operacion-delete-dialog.component.html'
})
export class CostoOperacionDeleteDialogComponent {

    costoOperacion: CostoOperacion;

    constructor(
        private costoOperacionService: CostoOperacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costoOperacionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'costoOperacionListModification',
                content: 'Deleted an costoOperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-costo-operacion-delete-popup',
    template: ''
})
export class CostoOperacionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoOperacionPopupService: CostoOperacionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.costoOperacionPopupService
                .open(CostoOperacionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
