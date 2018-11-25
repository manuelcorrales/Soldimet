import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from './estado-costo-repuesto.service';

@Component({
    selector: 'jhi-estado-costo-repuesto-delete-dialog',
    templateUrl: './estado-costo-repuesto-delete-dialog.component.html'
})
export class EstadoCostoRepuestoDeleteDialogComponent {
    estadoCostoRepuesto: IEstadoCostoRepuesto;

    constructor(
        private estadoCostoRepuestoService: EstadoCostoRepuestoService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoCostoRepuestoService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'estadoCostoRepuestoListModification',
                content: 'Deleted an estadoCostoRepuesto'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-costo-repuesto-delete-popup',
    template: ''
})
export class EstadoCostoRepuestoDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EstadoCostoRepuestoDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.estadoCostoRepuesto = estadoCostoRepuesto;
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
