import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ListaPrecioDesdeHasta } from './lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaPopupService } from './lista-precio-desde-hasta-popup.service';
import { ListaPrecioDesdeHastaService } from './lista-precio-desde-hasta.service';
import { CostoOperacion, CostoOperacionService } from '../costo-operacion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lista-precio-desde-hasta-dialog',
    templateUrl: './lista-precio-desde-hasta-dialog.component.html'
})
export class ListaPrecioDesdeHastaDialogComponent implements OnInit {

    listaPrecioDesdeHasta: ListaPrecioDesdeHasta;
    isSaving: boolean;

    costooperacions: CostoOperacion[];
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
        private costoOperacionService: CostoOperacionService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.costoOperacionService
            .query({filter: 'listapreciodesdehasta-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.listaPrecioDesdeHasta.costoOperacion || !this.listaPrecioDesdeHasta.costoOperacion.id) {
                    this.costooperacions = res.json;
                } else {
                    this.costoOperacionService
                        .find(this.listaPrecioDesdeHasta.costoOperacion.id)
                        .subscribe((subRes: CostoOperacion) => {
                            this.costooperacions = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.listaPrecioDesdeHasta.id !== undefined) {
            this.subscribeToSaveResponse(
                this.listaPrecioDesdeHastaService.update(this.listaPrecioDesdeHasta));
        } else {
            this.subscribeToSaveResponse(
                this.listaPrecioDesdeHastaService.create(this.listaPrecioDesdeHasta));
        }
    }

    private subscribeToSaveResponse(result: Observable<ListaPrecioDesdeHasta>) {
        result.subscribe((res: ListaPrecioDesdeHasta) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ListaPrecioDesdeHasta) {
        this.eventManager.broadcast({ name: 'listaPrecioDesdeHastaListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackCostoOperacionById(index: number, item: CostoOperacion) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-lista-precio-desde-hasta-popup',
    template: ''
})
export class ListaPrecioDesdeHastaPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private listaPrecioDesdeHastaPopupService: ListaPrecioDesdeHastaPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.listaPrecioDesdeHastaPopupService
                    .open(ListaPrecioDesdeHastaDialogComponent as Component, params['id']);
            } else {
                this.listaPrecioDesdeHastaPopupService
                    .open(ListaPrecioDesdeHastaDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
