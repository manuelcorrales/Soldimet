import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoCheque } from 'app/shared/model/pago-cheque.model';
import { PagoChequeService } from './pago-cheque.service';

@Component({
    selector: 'jhi-pago-cheque-delete-dialog',
    templateUrl: './pago-cheque-delete-dialog.component.html'
})
export class PagoChequeDeleteDialogComponent {
    pagoCheque: IPagoCheque;

    constructor(private pagoChequeService: PagoChequeService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagoChequeService.delete(id).subscribe(response => {
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
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagoCheque }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PagoChequeDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.pagoCheque = pagoCheque;
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
