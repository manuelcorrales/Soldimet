import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Cilindrada } from './cilindrada.model';
import { CilindradaPopupService } from './cilindrada-popup.service';
import { CilindradaService } from './cilindrada.service';

@Component({
    selector: 'jhi-cilindrada-delete-dialog',
    templateUrl: './cilindrada-delete-dialog.component.html'
})
export class CilindradaDeleteDialogComponent {

    cilindrada: Cilindrada;

    constructor(
        private cilindradaService: CilindradaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cilindradaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'cilindradaListModification',
                content: 'Deleted an cilindrada'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-cilindrada-delete-popup',
    template: ''
})
export class CilindradaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private cilindradaPopupService: CilindradaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.cilindradaPopupService
                .open(CilindradaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
