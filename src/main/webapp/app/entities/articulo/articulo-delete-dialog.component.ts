import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Articulo } from './articulo.model';
import { ArticuloPopupService } from './articulo-popup.service';
import { ArticuloService } from './articulo.service';

@Component({
    selector: 'jhi-articulo-delete-dialog',
    templateUrl: './articulo-delete-dialog.component.html'
})
export class ArticuloDeleteDialogComponent {

    articulo: Articulo;

    constructor(
        private articuloService: ArticuloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articuloService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'articuloListModification',
                content: 'Deleted an articulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-articulo-delete-popup',
    template: ''
})
export class ArticuloDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private articuloPopupService: ArticuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.articuloPopupService
                .open(ArticuloDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
