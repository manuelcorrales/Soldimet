import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from './medio-de-pago.service';

@Component({
    selector: 'jhi-medio-de-pago-delete-dialog',
    templateUrl: './medio-de-pago-delete-dialog.component.html'
})
export class MedioDePagoDeleteDialogComponent {
    medioDePago: IMedioDePago;

    constructor(
        private medioDePagoService: MedioDePagoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medioDePagoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medioDePagoListModification',
                content: 'Deleted an medioDePago'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medio-de-pago-delete-popup',
    template: ''
})
export class MedioDePagoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medioDePago }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedioDePagoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medioDePago = medioDePago;
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
