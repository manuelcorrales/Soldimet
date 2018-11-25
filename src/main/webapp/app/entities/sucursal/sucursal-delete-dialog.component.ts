import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';

@Component({
    selector: 'jhi-sucursal-delete-dialog',
    templateUrl: './sucursal-delete-dialog.component.html'
})
export class SucursalDeleteDialogComponent {
    sucursal: ISucursal;

    constructor(private sucursalService: SucursalService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.sucursalService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'sucursalListModification',
                content: 'Deleted an sucursal'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-sucursal-delete-popup',
    template: ''
})
export class SucursalDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ sucursal }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(SucursalDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.sucursal = sucursal;
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
