import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Marca } from './marca.model';
import { MarcaPopupService } from './marca-popup.service';
import { MarcaService } from './marca.service';

@Component({
    selector: 'jhi-marca-delete-dialog',
    templateUrl: './marca-delete-dialog.component.html'
})
export class MarcaDeleteDialogComponent {

    marca: Marca;

    constructor(
        private marcaService: MarcaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.marcaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'marcaListModification',
                content: 'Deleted an marca'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-marca-delete-popup',
    template: ''
})
export class MarcaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private marcaPopupService: MarcaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.marcaPopupService
                .open(MarcaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
