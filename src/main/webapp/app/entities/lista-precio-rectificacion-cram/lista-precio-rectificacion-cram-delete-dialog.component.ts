import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ListaPrecioRectificacionCRAM } from './lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMPopupService } from './lista-precio-rectificacion-cram-popup.service';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-delete-dialog',
    templateUrl: './lista-precio-rectificacion-cram-delete-dialog.component.html'
})
export class ListaPrecioRectificacionCRAMDeleteDialogComponent {

    listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM;

    constructor(
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.listaPrecioRectificacionCRAMService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'listaPrecioRectificacionCRAMListModification',
                content: 'Deleted an listaPrecioRectificacionCRAM'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-delete-popup',
    template: ''
})
export class ListaPrecioRectificacionCRAMDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private listaPrecioRectificacionCRAMPopupService: ListaPrecioRectificacionCRAMPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.listaPrecioRectificacionCRAMPopupService
                .open(ListaPrecioRectificacionCRAMDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
