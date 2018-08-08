import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { NgbActiveModal, NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from './articulo.service';

@Component({
    selector: 'jhi-articulo-delete-dialog',
    templateUrl: './articulo-delete-dialog.component.html'
})
export class ArticuloDeleteDialogComponent {
    articulo: IArticulo;

    constructor(private articuloService: ArticuloService, public activeModal: NgbActiveModal, private eventManager: JhiEventManager) {}

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.articuloService.delete(id).subscribe(response => {
            this.eventManager.broadcast({
                name: 'articuloListModification',
                content: 'Deleted an articulo'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-articulo-delete-popup',
    template: ''
})
export class ArticuloDeletePopupComponent implements OnInit, OnDestroy {
    private ngbModalRef: NgbModalRef;

    constructor(private activatedRoute: ActivatedRoute, private router: Router, private modalService: NgbModal) {}

    ngOnInit() {
        this.activatedRoute.data.subscribe(({ articulo }) => {
            setTimeout(() => {
                this.ngbModalRef = this.modalService.open(ArticuloDeleteDialogComponent as Component, { size: 'lg', backdrop: 'static' });
                this.ngbModalRef.componentInstance.articulo = articulo;
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
