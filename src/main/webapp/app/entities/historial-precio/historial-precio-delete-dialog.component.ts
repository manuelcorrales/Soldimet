import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';
import { HistorialPrecioService } from 'app/entities/historial-precio/historial-precio.service';

@Component({
    selector: 'jhi-historial-precio-delete-dialog',
    templateUrl: './historial-precio-delete-dialog.component.html'
})
export class HistorialPrecioDeleteDialogComponent {
    historialPrecio: IHistorialPrecio;

    constructor(
        private historialPrecioService: HistorialPrecioService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.historialPrecioService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'historialPrecioListModification',
                content: 'Deleted an historialPrecio'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-historial-precio-delete-popup',
    template: ''
})
export class HistorialPrecioDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ historialPrecio }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(HistorialPrecioDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.historialPrecio = historialPrecio;
                this.ngbModalRef.result.then(
                    result => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    },
                    reason => {
                        this.router.navigate([{ outlets: { popup: null } }], { replaceUrl: true, queryParamsHandling: 'merge' });
                        this.ngbModalRef = null;
                    }
                );
            }, 0);
        });
    }

    ngOnDestroy() {
        this.ngbModalRef = null;
    }
}
