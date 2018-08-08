import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago';

@Component({
    selector: 'jhi-pago-efectivo-update',
    templateUrl: './pago-efectivo-update.component.html'
})
export class PagoEfectivoUpdateComponent implements OnInit {
    private _pagoEfectivo: IPagoEfectivo;
    isSaving: boolean;

    formadepagos: IFormaDePago[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private pagoEfectivoService: PagoEfectivoService,
        private formaDePagoService: FormaDePagoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
            this.pagoEfectivo = pagoEfectivo;
        });
        this.formaDePagoService.query({ filter: 'pagoefectivo-is-null' }).subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                if (!this.pagoEfectivo.formaDePago || !this.pagoEfectivo.formaDePago.id) {
                    this.formadepagos = res.body;
                } else {
                    this.formaDePagoService.find(this.pagoEfectivo.formaDePago.id).subscribe(
                        (subRes: HttpResponse<IFormaDePago>) => {
                            this.formadepagos = [subRes.body].concat(res.body);
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
        if (this.pagoEfectivo.id !== undefined) {
            this.subscribeToSaveResponse(this.pagoEfectivoService.update(this.pagoEfectivo));
        } else {
            this.subscribeToSaveResponse(this.pagoEfectivoService.create(this.pagoEfectivo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPagoEfectivo>>) {
        result.subscribe((res: HttpResponse<IPagoEfectivo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get pagoEfectivo() {
        return this._pagoEfectivo;
    }

    set pagoEfectivo(pagoEfectivo: IPagoEfectivo) {
        this._pagoEfectivo = pagoEfectivo;
    }
}
