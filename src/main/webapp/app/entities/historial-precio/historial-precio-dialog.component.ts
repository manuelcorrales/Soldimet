import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Response } from '@angular/http';

import { Observable } from 'rxjs/Rx';
import { NgbActiveModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager, JhiAlertService } from 'ng-jhipster';

import { HistorialPrecio } from './historial-precio.model';
import { HistorialPrecioPopupService } from './historial-precio-popup.service';
import { HistorialPrecioService } from './historial-precio.service';
import { PrecioRepuesto, PrecioRepuestoService } from '../precio-repuesto';
import { ResponseWrapper } from '../../shared';

@Component({
    selector: 'jhi-historial-precio-dialog',
    templateUrl: './historial-precio-dialog.component.html'
})
export class HistorialPrecioDialogComponent implements OnInit {
    historialPrecio: HistorialPrecio;
    isSaving: boolean;

    preciorepuestos: PrecioRepuesto[];
    fechaHistorialDp: any;

    constructor(
        public activeModal: NgbActiveModal,
        private jhiAlertService: JhiAlertService,
        private historialPrecioService: HistorialPrecioService,
        private precioRepuestoService: PrecioRepuestoService,
        private eventManager: JhiEventManager
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.precioRepuestoService.query({ filter: 'historialprecio-is-null' }).subscribe(
            (res: ResponseWrapper) => {
                if (!this.historialPrecio.precioRepuesto || !this.historialPrecio.precioRepuesto.id) {
                    this.preciorepuestos = res.json;
                } else {
                    this.precioRepuestoService.find(this.historialPrecio.precioRepuesto.id).subscribe(
                        (subRes: PrecioRepuesto) => {
                            this.preciorepuestos = [subRes].concat(res.json);
                        },
                        (subRes: ResponseWrapper) => this.onError(subRes.json)
                    );
                }
            },
            (res: ResponseWrapper) => this.onError(res.json)
        );
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    save() {
        this.isSaving = true;
        if (this.historialPrecio.id !== undefined) {
            this.subscribeToSaveResponse(this.historialPrecioService.update(this.historialPrecio));
        } else {
            this.subscribeToSaveResponse(this.historialPrecioService.create(this.historialPrecio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HistorialPrecio>) {
        result.subscribe((res: HistorialPrecio) => this.onSaveSuccess(res), (res: Response) => this.onSaveError());
    }

    private onSaveSuccess(result: HistorialPrecio) {
        this.eventManager.broadcast({ name: 'historialPrecioListModification', content: 'OK' });
        this.isSaving = false;
        this.activeModal.dismiss(result);
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(error: any) {
        this.jhiAlertService.error(error.message, null, null);
    }

    trackPrecioRepuestoById(index: number, item: PrecioRepuesto) {
        return item.id;
    }
}

@Component({
    selector: 'jhi-historial-precio-popup',
    template: ''
})
export class HistorialPrecioPopupComponent implements OnInit, OnDestroy {
    routeSub: any;

    constructor(private route: ActivatedRoute, private historialPrecioPopupService: HistorialPrecioPopupService) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe(params => {
            if (params['id']) {
                this.historialPrecioPopupService.open(HistorialPrecioDialogComponent as Component, params['id']);
            } else {
                this.historialPrecioPopupService.open(HistorialPrecioDialogComponent as Component);
            }
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
