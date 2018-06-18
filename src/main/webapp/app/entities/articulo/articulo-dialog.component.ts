import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { Articulo } from './articulo.model';
import { ArticuloPopupService } from './articulo-popup.service';
import { ArticuloService } from './articulo.service';
import { EstadoArticulo, EstadoArticuloService } from '../estado-articulo';
import { Marca, MarcaService } from '../marca';
import { TipoRepuesto, TipoRepuestoService } from '../tipo-repuesto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-articulo-dialog',
    templateUrl: './articulo-dialog.component.html'
})
export class ArticuloDialogComponent implements OnInit {

    articulo: Articulo;
    isSaving: boolean;

    estadoarticulos: EstadoArticulo[];

    marcas: Marca[];

    tiporepuestos: TipoRepuesto[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private articuloService: ArticuloService,
        private estadoArticuloService: EstadoArticuloService,
        private marcaService: MarcaService,
        private tipoRepuestoService: TipoRepuestoService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.estadoArticuloService.query()
            .subscribe((res: ResponseWrapper) => { this.estadoarticulos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.marcaService.query()
            .subscribe((res: ResponseWrapper) => { this.marcas = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.tipoRepuestoService.query()
            .subscribe((res: ResponseWrapper) => { this.tiporepuestos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.articulo.id !== undefined) {
            this.subscribeToSaveResponse(
                this.articuloService.update(this.articulo));
        } else {
            this.subscribeToSaveResponse(
                this.articuloService.create(this.articulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<Articulo>) {
        result.subscribe((res: Articulo) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: Articulo) {
        this.eventManager.broadcast({ name: 'articuloListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackEstadoArticuloById(index: number, item: EstadoArticulo) {
        return item.id;
    }

    trackMarcaById(index: number, item: Marca) {
        return item.id;
    }

    trackTipoRepuestoById(index: number, item: TipoRepuesto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-articulo-popup',
    template: ''
})
export class ArticuloPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private articuloPopupService: ArticuloPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.articuloPopupService
                    .open(ArticuloDialogComponent as Component, params['id']);
            } else {
                this.articuloPopupService
                    .open(ArticuloDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
