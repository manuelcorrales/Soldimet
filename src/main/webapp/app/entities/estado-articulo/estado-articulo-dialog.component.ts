import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { EstadoArticulo } from './estado-articulo.model';
import { EstadoArticuloPopupService } from './estado-articulo-popup.service';
import { EstadoArticuloService } from './estado-articulo.service';

@Component({
    selector: 'jhi-estado-articulo-dialog',
    templateUrl: './estado-articulo-dialog.component.html'
})
export class EstadoArticuloDialogComponent implements OnInit {
    estadoArticulo: EstadoArticulo;
    isSaving: boolean;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private estadoArticuloService: EstadoArticuloService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.estadoArticulo.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoArticuloService.update(this.estadoArticulo));
        } else {
            this.subscribeToSaveResponse(this.estadoArticuloService.create(this.estadoArticulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<EstadoArticulo>) {
        result.subscribe((res: EstadoArticulo) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: EstadoArticulo) {
        this.eventManager.broadcast({ name: 'estadoArticuloListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }
}

@Component({
    selector: 'jhi-estado-articulo-popup',
    template: ''
})
export class EstadoArticuloPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private estadoArticuloPopupService: EstadoArticuloPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.estadoArticuloPopupService.open(EstadoArticuloDialogComponent as Component, params['id']);
            } else {
                this.estadoArticuloPopupService.open(EstadoArticuloDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
