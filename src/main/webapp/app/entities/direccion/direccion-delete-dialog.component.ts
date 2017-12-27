import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Direccion } from './direccion.model';
import { DireccionPopupService } from './direccion-popup.service';
import { DireccionService } from './direccion.service';

@Component({
    selector: 'jhi-direccion-delete-dialog',
    templateUrl: './direccion-delete-dialog.component.html'
})
export class DireccionDeleteDialogComponent {

    direccion: Direccion;

    constructor(
        private direccionService: DireccionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.direccionService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'direccionListModification',
                content: 'Deleted an direccion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-direccion-delete-popup',
    template: ''
})
export class DireccionDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private direccionPopupService: DireccionPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.direccionPopupService
                .open(DireccionDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
