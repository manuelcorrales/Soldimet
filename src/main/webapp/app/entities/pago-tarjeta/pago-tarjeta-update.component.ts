import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { PagoTarjetaService } from './pago-tarjeta.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago';
import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from 'app/entities/tarjeta';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta';

@Component({
    selector: 'jhi-pago-tarjeta-update',
    templateUrl: './pago-tarjeta-update.component.html'
})
export class PagoTarjetaUpdateComponent implements OnInit {
    private _pagoTarjeta: IPagoTarjeta;
    isSaving: boolean;

    formadepagos: IFormaDePago[];

    tarjetas: ITarjeta[];

    tipotarjetas: ITipoTarjeta[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private pagoTarjetaService: PagoTarjetaService,
        private formaDePagoService: FormaDePagoService,
        private tarjetaService: TarjetaService,
        private tipoTarjetaService: TipoTarjetaService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pagoTarjeta }) => {
            this.pagoTarjeta = pagoTarjeta;
        });
        this.formaDePagoService.query({ filter: 'pagotarjeta-is-null' }).subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                if (!this.pagoTarjeta.formaDePago || !this.pagoTarjeta.formaDePago.id) {
                    this.formadepagos = res.body;
                } else {
                    this.formaDePagoService.find(this.pagoTarjeta.formaDePago.id).subscribe(
                        (subRes: HttpResponse<IFormaDePago>) => {
                            this.formadepagos = [subRes.body].concat(res.body);
                        },
                        (subRes: HttpErrorResponse) => this.onError(subRes.message)
                    );
                }
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.pagoTarjeta.id !== undefined) {
            this.subscribeToSaveResponse(this.pagoTarjetaService.update(this.pagoTarjeta));
        } else {
            this.subscribeToSaveResponse(this.pagoTarjetaService.create(this.pagoTarjeta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPagoTarjeta>>) {
        result.subscribe((res: HttpResponse<IPagoTarjeta>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFormaDePagoById(index: number, item: IFormaDePago) {
        return item.id;
    }

    trackTarjetaById(index: number, item: ITarjeta) {
        return item.id;
    }

    trackTipoTarjetaById(index: number, item: ITipoTarjeta) {
        return item.id;
    }
    get pagoTarjeta() {
        return this._pagoTarjeta;
    }

    set pagoTarjeta(pagoTarjeta: IPagoTarjeta) {
        this._pagoTarjeta = pagoTarjeta;
    }
}
