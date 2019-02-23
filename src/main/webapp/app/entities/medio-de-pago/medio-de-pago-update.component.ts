import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from './medio-de-pago.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago';

@Component({
    selector: 'jhi-medio-de-pago-update',
    templateUrl: './medio-de-pago-update.component.html'
})
export class MedioDePagoUpdateComponent implements OnInit {
    private _medioDePago: IMedioDePago;
    isSaving: boolean;

    formadepagos: IFormaDePago[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private medioDePagoService: MedioDePagoService,
        private formaDePagoService: FormaDePagoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medioDePago }) => {
            this.medioDePago = medioDePago;
        });
        this.formaDePagoService.query().subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                this.formadepagos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medioDePago.id !== undefined) {
            this.subscribeToSaveResponse(this.medioDePagoService.update(this.medioDePago));
        } else {
            this.subscribeToSaveResponse(this.medioDePagoService.create(this.medioDePago));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePago>>) {
        result.subscribe((res: HttpResponse<IMedioDePago>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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
    get medioDePago() {
        return this._medioDePago;
    }

    set medioDePago(medioDePago: IMedioDePago) {
        this._medioDePago = medioDePago;
    }
}
