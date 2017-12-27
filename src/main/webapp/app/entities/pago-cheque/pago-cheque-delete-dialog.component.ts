import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { PagoCheque } from './pago-cheque.model';
import { PagoChequePopupService } from './pago-cheque-popup.service';
import { PagoChequeService } from './pago-cheque.service';

@Component({
    selector: 'jhi-pago-cheque-delete-dialog',
    templateUrl: './pago-cheque-delete-dialog.component.html'
})
export class PagoChequeDeleteDialogComponent {

    pagoCheque: PagoCheque;

    constructor(
        private pagoChequeService: PagoChequeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagoChequeService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'pagoChequeListModification',
                content: 'Deleted an pagoCheque'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pago-cheque-delete-popup',
    template: ''
})
export class PagoChequeDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private pagoChequePopupService: PagoChequePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.pagoChequePopupService
                .open(PagoChequeDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
