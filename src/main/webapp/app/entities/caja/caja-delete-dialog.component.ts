import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';

@Component({
    selector: 'jhi-caja-delete-dialog',
    templateUrl: './caja-delete-dialog.component.html'
})
export class CajaDeleteDialogComponent {
    caja: ICaja;

    constructor(private cajaService: CajaService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.cajaService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'cajaListModification',
                content: 'Deleted an caja'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-caja-delete-popup',
    template: ''
})
export class CajaDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ caja }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CajaDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.caja = caja;
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
