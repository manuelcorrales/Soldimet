import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';

@Component({
    selector: 'jhi-pago-tarjeta-delete-dialog',
    templateUrl: './pago-tarjeta-delete-dialog.component.html'
})
export class PagoTarjetaDeleteDialogComponent {
    pagoTarjeta: IPagoTarjeta;

    constructor(
        private pagoTarjetaService: PagoTarjetaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.pagoTarjetaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'pagoTarjetaListModification',
                content: 'Deleted an pagoTarjeta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-pago-tarjeta-delete-popup',
    template: ''
})
export class PagoTarjetaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ pagoTarjeta }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(PagoTarjetaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.pagoTarjeta = pagoTarjeta;
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
