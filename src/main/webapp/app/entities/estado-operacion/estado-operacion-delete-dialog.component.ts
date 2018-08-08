import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from './estado-operacion.service';

@Component({
    selector: 'jhi-estado-operacion-delete-dialog',
    templateUrl: './estado-operacion-delete-dialog.component.html'
})
export class EstadoOperacionDeleteDialogComponent {
    estadoOperacion: IEstadoOperacion;

    constructor(
        private estadoOperacionService: EstadoOperacionService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoOperacionService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'estadoOperacionListModification',
                content: 'Deleted an estadoOperacion'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-operacion-delete-popup',
    template: ''
})
export class EstadoOperacionDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EstadoOperacionDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.estadoOperacion = estadoOperacion;
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
