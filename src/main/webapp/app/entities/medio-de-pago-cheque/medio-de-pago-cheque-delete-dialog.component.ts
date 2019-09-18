import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';

@Component({
    selector: 'jhi-medio-de-pago-cheque-delete-dialog',
    templateUrl: './medio-de-pago-cheque-delete-dialog.component.html'
})
export class MedioDePagoChequeDeleteDialogComponent {
    medioDePagoCheque: IMedioDePagoCheque;

    constructor(
        private medioDePagoChequeService: MedioDePagoChequeService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medioDePagoChequeService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medioDePagoChequeListModification',
                content: 'Deleted an medioDePagoCheque'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medio-de-pago-cheque-delete-popup',
    template: ''
})
export class MedioDePagoChequeDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medioDePagoCheque }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedioDePagoChequeDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medioDePagoCheque = medioDePagoCheque;
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
