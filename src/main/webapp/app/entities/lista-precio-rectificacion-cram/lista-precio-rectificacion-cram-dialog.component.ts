import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { ListaPrecioRectificacionCRAM } from './lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMPopupService } from './lista-precio-rectificacion-cram-popup.service';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';
import { CostoOperacion, CostoOperacionService } from '../costo-operacion';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-dialog',
    templateUrl: './lista-precio-rectificacion-cram-dialog.component.html'
})
export class ListaPrecioRectificacionCRAMDialogComponent implements OnInit {
    listaPrecioRectificacionCRAM: ListaPrecioRectificacionCRAM;
    isSaving: boolean;

    costooperacions: CostoOperacion[];
    fechaVigenciaDesdeDp: any;
    fechaVigenciaHastaDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        private costoOperacionService: CostoOperacionService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.costoOperacionService.query().subscribe(
            (res: ResponseWrapper) => {
                this.costooperacions = res.json;
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.listaPrecioRectificacionCRAM.id !== undefined) {
            this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.update(this.listaPrecioRectificacionCRAM));
        } else {
            this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.create(this.listaPrecioRectificacionCRAM));
        }
    }

    private subscribeToSaveResponse(result: Observable<ListaPrecioRectificacionCRAM>) {
        result.subscribe((res: ListaPrecioRectificacionCRAM) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: ListaPrecioRectificacionCRAM) {
        this.eventManager.broadcast({ name: 'listaPrecioRectificacionCRAMListModification', content: 'OK' });
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
    selector: 'jhi-lista-precio-rectificacion-cram-popup',
    template: ''
})
export class ListaPrecioRectificacionCRAMPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private listaPrecioRectificacionCRAMPopupService: ListaPrecioRectificacionCRAMPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.listaPrecioRectificacionCRAMPopupService.open(ListaPrecioRectificacionCRAMDialogComponent as Component, params['id']);
            } else {
                this.listaPrecioRectificacionCRAMPopupService.open(ListaPrecioRectificacionCRAMDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
