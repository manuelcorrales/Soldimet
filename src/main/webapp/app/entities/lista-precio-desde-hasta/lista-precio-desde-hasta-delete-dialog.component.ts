import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ListaPrecioDesdeHasta } from './lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaPopupService } from './lista-precio-desde-hasta-popup.service';
import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';

@Component({
    selector: 'jhi-lista-precio-desde-hasta-delete-dialog',
    templateUrl: './lista-precio-desde-hasta-delete-dialog.component.html'
})
export class ListaPrecioDesdeHastaDeleteDialogComponent {

    listaPrecioDesdeHasta: ListaPrecioDesdeHasta;

    constructor(
        private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listaPrecioDesdeHastaService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'listaPrecioDesdeHastaListModification',
                content: 'Deleted an listaPrecioDesdeHasta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lista-precio-desde-hasta-delete-popup',
    template: ''
})
export class ListaPrecioDesdeHastaDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private listaPrecioDesdeHastaPopupService: ListaPrecioDesdeHastaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.listaPrecioDesdeHastaPopupService
                .open(ListaPrecioDesdeHastaDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
