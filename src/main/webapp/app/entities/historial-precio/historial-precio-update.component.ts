import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IHistorialPrecio } from 'app/shared/model/historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';
import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto';

@Component({
    selector: 'jhi-historial-precio-update',
    templateUrl: './historial-precio-update.component.html'
})
export class HistorialPrecioUpdateComponent implements OnInit {
    private _historialPrecio: IHistorialPrecio;
    isSaving: boolean;

    preciorepuestos: IPrecioRepuesto[];
    fechaHistorialDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private historialPrecioService: HistorialPrecioService,
        private precioRepuestoService: PrecioRepuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ historialPrecio }) => {
            this.historialPrecio = historialPrecio;
        });
        this.precioRepuestoService.query({ filter: 'historialprecio-is-null' }).subscribe(
            (res: HttpResponse<IPrecioRepuesto[]>) => {
                if (!this.historialPrecio.precioRepuesto || !this.historialPrecio.precioRepuesto.id) {
                    this.preciorepuestos = res.body;
                } else {
                    this.precioRepuestoService.find(this.historialPrecio.precioRepuesto.id).subscribe(
                        (subRes: HttpResponse<IPrecioRepuesto>) => {
                            this.preciorepuestos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.historialPrecio.id !== undefined) {
            this.subscribeToSaveResponse(this.historialPrecioService.update(this.historialPrecio));
        } else {
            this.subscribeToSaveResponse(this.historialPrecioService.create(this.historialPrecio));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IHistorialPrecio>>) {
        result.subscribe((res: HttpResponse<IHistorialPrecio>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackPrecioRepuestoById(index: number, item: IPrecioRepuesto) {
        return item.id;
    }
    get historialPrecio() {
        return this._historialPrecio;
    }

    set historialPrecio(historialPrecio: IHistorialPrecio) {
        this._historialPrecio = historialPrecio;
    }
}
