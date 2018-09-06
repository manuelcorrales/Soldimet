import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';

@Component({
    selector: 'jhi-estado-articulo-delete-dialog',
    templateUrl: './estado-articulo-delete-dialog.component.html'
})
export class EstadoArticuloDeleteDialogComponent {
    estadoArticulo: IEstadoArticulo;

    constructor(
        private estadoArticuloService: EstadoArticuloService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.estadoArticuloService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'estadoArticuloListModification',
                content: 'Deleted an estadoArticulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-estado-articulo-delete-popup',
    template: ''
})
export class EstadoArticuloDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(EstadoArticuloDeleteDialogComponent as Component, {
                    size: 'lg',
                    backdrop: 'static'
                });
                this.ngbModalRef.componentInstance.estadoArticulo = estadoArticulo;
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
