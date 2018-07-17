import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { MovimientoArticulo } from './movimiento-articulo.model';
import { MovimientoArticuloPopupService } from './movimiento-articulo-popup.service';
import { MovimientoArticuloService } from './movimiento-articulo.service';
import { Articulo, ArticuloService } from '../articulo';
import { Movimiento, MovimientoService } from '../movimiento';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-movimiento-articulo-dialog',
    templateUrl: './movimiento-articulo-dialog.component.html'
})
export class MovimientoArticuloDialogComponent implements OnInit {

    movimientoArticulo: MovimientoArticulo;
    isSaving: boolean;

    articulos: Articulo[];

    movimientos: Movimiento[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private movimientoArticuloService: MovimientoArticuloService,
        private articuloService: ArticuloService,
        private movimientoService: MovimientoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.articuloService.query()
            .subscribe((res: ResponseWrapper) => { this.articulos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.movimientoService
            .query({filter: 'movimientoarticulo-is-null'})
            .subscribe((res: ResponseWrapper) => {
                if (!this.movimientoArticulo.movimiento || !this.movimientoArticulo.movimiento.id) {
                    this.movimientos = res.json;
                } else {
                    this.movimientoService
                        .find(this.movimientoArticulo.movimiento.id)
                        .subscribe((subRes: Movimiento) => {
                            this.movimientos = [subRes].concat(res.json);
                        }, (subRes: ResponseWrapper) => this.onError(subRes.json));
                }
            }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.movimientoArticulo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.movimientoArticuloService.update(this.movimientoArticulo));
        } else {
            this.subscribeToSaveResponse(
                this.movimientoArticuloService.create(this.movimientoArticulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<MovimientoArticulo>) {
        result.subscribe((res: MovimientoArticulo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: MovimientoArticulo) {
        this.eventManager.broadcast({ name: 'movimientoArticuloListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackArticuloById(index: number, item: Articulo) {
        return item.id;
    }

    trackMovimientoById(index: number, item: Movimiento) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-movimiento-articulo-popup',
    template: ''
})
export class MovimientoArticuloPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private movimientoArticuloPopupService: MovimientoArticuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.movimientoArticuloPopupService
                    .open(MovimientoArticuloDialogComponent as Component, params['id']);
            } else {
                this.movimientoArticuloPopupService
                    .open(MovimientoArticuloDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
