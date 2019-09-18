import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';
import { IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco';

@Component({
    selector: 'jhi-medio-de-pago-cheque-update',
    templateUrl: './medio-de-pago-cheque-update.component.html'
})
export class MedioDePagoChequeUpdateComponent implements OnInit {
    private _medioDePagoCheque: IMedioDePagoCheque;
    isSaving: boolean;

    bancos: IBanco[];
    fechaReciboDp: any;
    fechaCobroDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private medioDePagoChequeService: MedioDePagoChequeService,
        private bancoService: BancoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ medioDePagoCheque }) => {
            this.medioDePagoCheque = medioDePagoCheque;
        });
        this.bancoService.query().subscribe(
            (res: HttpResponse<IBanco[]>) => {
                this.bancos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.medioDePagoCheque.id !== undefined) {
            this.subscribeToSaveResponse(this.medioDePagoChequeService.update(this.medioDePagoCheque));
        } else {
            this.subscribeToSaveResponse(this.medioDePagoChequeService.create(this.medioDePagoCheque));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePagoCheque>>) {
        result.subscribe((res: HttpResponse<IMedioDePagoCheque>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackBancoById(index: number, item: IBanco) {
        return item.id;
    }
    get medioDePagoCheque() {
        return this._medioDePagoCheque;
    }

    set medioDePagoCheque(medioDePagoCheque: IMedioDePagoCheque) {
        this._medioDePagoCheque = medioDePagoCheque;
    }
}
