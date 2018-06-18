import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { CostoRepuesto } from './costo-repuesto.model';
import { CostoRepuestoPopupService } from './costo-repuesto-popup.service';
import { CostoRepuestoService } from './costo-repuesto.service';
import { TipoRepuesto, TipoRepuestoService } from '../tipo-repuesto';
import { Articulo, ArticuloService } from '../articulo';
import { Proveedor, ProveedorService } from '../proveedor';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-costo-repuesto-dialog',
    templateUrl: './costo-repuesto-dialog.component.html'
})
export class CostoRepuestoDialogComponent implements OnInit {

    costoRepuesto: CostoRepuesto;
    isSaving: boolean;

    tiporepuestos: TipoRepuesto[];

    articulos: Articulo[];

    proveedors: Proveedor[];

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private costoRepuestoService: CostoRepuestoService,
        private tipoRepuestoService: TipoRepuestoService,
        private articuloService: ArticuloService,
        private proveedorService: ProveedorService,
        private eventManager: JhiEventManager
    ) {
    }

    ngOnInit() {
        this.isSaving = false;
        this.tipoRepuestoService.query()
            .subscribe((res: ResponseWrapper) => { this.tiporepuestos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.articuloService.query()
            .subscribe((res: ResponseWrapper) => { this.articulos = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
        this.proveedorService.query()
            .subscribe((res: ResponseWrapper) => { this.proveedors = res.json; }, (res: ResponseWrapper) => this.onError(res.json));
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.costoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(
                this.costoRepuestoService.update(this.costoRepuesto));
        } else {
            this.subscribeToSaveResponse(
                this.costoRepuestoService.create(this.costoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<CostoRepuesto>) {
        result.subscribe((res: CostoRepuesto) =>
            this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: CostoRepuesto) {
        this.eventManager.broadcast({ name: 'costoRepuestoListModification', content: 'OK'});
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackTipoRepuestoById(index: number, item: TipoRepuesto) {
        return item.id;
    }

    trackArticuloById(index: number, item: Articulo) {
        return item.id;
    }

    trackProveedorById(index: number, item: Proveedor) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-costo-repuesto-popup',
    template: ''
})
export class CostoRepuestoPopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private costoRepuestoPopupService: CostoRepuestoPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            if ( params['id'] ) {
                this.costoRepuestoPopupService
                    .open(CostoRepuestoDialogComponent as Component, params['id']);
            } else {
                this.costoRepuestoPopupService
                    .open(CostoRepuestoDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
