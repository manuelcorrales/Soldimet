import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';

@Component({
    selector: 'jhi-costo-operacion-delete-dialog',
    templateUrl: './costo-operacion-delete-dialog.component.html'
})
export class CostoOperacionDeleteDialogComponent {
    costoOperacion: ICostoOperacion;

    constructor(
        private costoOperacionService: CostoOperacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.costoOperacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'costoOperacionListModification',
                content: 'Deleted an costoOperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-costo-operacion-delete-popup',
    template: ''
})
export class CostoOperacionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ costoOperacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(CostoOperacionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.costoOperacion = costoOperacion;
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
