import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Caja } from './caja.model';
import { CajaPopupService } from './caja-popup.service';
import { CajaService } from './caja.service';

@Component({
    selector: 'jhi-caja-delete-dialog',
    templateUrl: './caja-delete-dialog.component.html'
})
export class CajaDeleteDialogComponent {

    caja: Caja;

    constructor(
        private cajaService: CajaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cajaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cajaListModification',
                content: 'Deleted an caja'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-caja-delete-popup',
    template: ''
})
export class CajaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cajaPopupService: CajaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cajaPopupService
                .open(CajaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
