import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';

@Component({
    selector: 'jhi-pago-efectivo-delete-dialog',
    templateUrl: './pago-efectivo-delete-dialog.component.html'
})
export class PagoEfectivoDeleteDialogComponent {
    pagoEfectivo: IPagoEfectivo;

    constructor(
        private pagoEfectivoService: PagoEfectivoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagoEfectivoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pagoEfectivoListModification',
                content: 'Deleted an pagoEfectivo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pago-efectivo-delete-popup',
    template: ''
})
export class PagoEfectivoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PagoEfectivoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pagoEfectivo = pagoEfectivo;
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
