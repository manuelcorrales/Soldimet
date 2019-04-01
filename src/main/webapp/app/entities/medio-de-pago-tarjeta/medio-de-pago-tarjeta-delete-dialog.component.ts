import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from './medio-de-pago-tarjeta.service';

@Component({
    selector: 'jhi-medio-de-pago-tarjeta-delete-dialog',
    templateUrl: './medio-de-pago-tarjeta-delete-dialog.component.html'
})
export class MedioDePagoTarjetaDeleteDialogComponent {
    medioDePagoTarjeta: IMedioDePagoTarjeta;

    constructor(
        private medioDePagoTarjetaService: MedioDePagoTarjetaService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.medioDePagoTarjetaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'medioDePagoTarjetaListModification',
                content: 'Deleted an medioDePagoTarjeta'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-medio-de-pago-tarjeta-delete-popup',
    template: ''
})
export class MedioDePagoTarjetaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ medioDePagoTarjeta }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(MedioDePagoTarjetaDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.medioDePagoTarjeta = medioDePagoTarjeta;
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
