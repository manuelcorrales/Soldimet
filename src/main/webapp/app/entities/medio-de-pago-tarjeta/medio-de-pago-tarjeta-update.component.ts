import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from './medio-de-pago-tarjeta.service';
import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from 'app/entities/tarjeta';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta';

@Component({
    selector: 'jhi-medio-de-pago-tarjeta-update',
    templateUrl: './medio-de-pago-tarjeta-update.component.html'
})
export class MedioDePagoTarjetaUpdateComponent implements OnInit {
    private _medioDePagoTarjeta: IMedioDePagoTarjeta;
    isSaving: boolean;

    tarjetas: ITarjeta[];

    tipotarjetas: ITipoTarjeta[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private medioDePagoTarjetaService: MedioDePagoTarjetaService,
        private tarjetaService: TarjetaService,
        private tipoTarjetaService: TipoTarjetaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medioDePagoTarjeta }) => {
            this.medioDePagoTarjeta = medioDePagoTarjeta;
        });
        this.tarjetaService.query().subscribe(
            (res: HttpResponse<ITarjeta[]>) => {
                this.tarjetas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.tipoTarjetaService.query().subscribe(
            (res: HttpResponse<ITipoTarjeta[]>) => {
                this.tipotarjetas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medioDePagoTarjeta.id !== undefined) {
            this.subscribeToSaveResponse(this.medioDePagoTarjetaService.update(this.medioDePagoTarjeta));
        } else {
            this.subscribeToSaveResponse(this.medioDePagoTarjetaService.create(this.medioDePagoTarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePagoTarjeta>>) {
        result.subscribe((res: HttpResponse<IMedioDePagoTarjeta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTarjetaById(index: number, item: ITarjeta) {
        return item.id;
    }

    trackTipoTarjetaById(index: number, item: ITipoTarjeta) {
        return item.id;
    }
    get medioDePagoTarjeta() {
        return this._medioDePagoTarjeta;
    }

    set medioDePagoTarjeta(medioDePagoTarjeta: IMedioDePagoTarjeta) {
        this._medioDePagoTarjeta = medioDePagoTarjeta;
    }
}
