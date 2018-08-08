import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPagoCheque } from 'app/shared/model/pago-cheque.model';
import { PagoChequeService } from './pago-cheque.service';
import { IBanco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago';

@Component({
    selector: 'jhi-pago-cheque-update',
    templateUrl: './pago-cheque-update.component.html'
})
export class PagoChequeUpdateComponent implements OnInit {
    private _pagoCheque: IPagoCheque;
    isSaving: boolean;

    bancos: IBanco[];

    formadepagos: IFormaDePago[];
    fechaCobroDp: any;
    fechaReciboDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pagoChequeService: PagoChequeService,
        private bancoService: BancoService,
        private formaDePagoService: FormaDePagoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pagoCheque }) => {
            this.pagoCheque = pagoCheque;
        });
        this.bancoService.query().subscribe(
            (res: HttpResponse<IBanco[]>) => {
                this.bancos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.formaDePagoService.query({ filter: 'pagocheque-is-null' }).subscribe(
            (res: HttpResponse<IFormaDePago[]>) => {
                if (!this.pagoCheque.formaDePago || !this.pagoCheque.formaDePago.id) {
                    this.formadepagos = res.body;
                } else {
                    this.formaDePagoService.find(this.pagoCheque.formaDePago.id).subscribe(
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
        if (this.pagoCheque.id !== undefined) {
            this.subscribeToSaveResponse(this.pagoChequeService.update(this.pagoCheque));
        } else {
            this.subscribeToSaveResponse(this.pagoChequeService.create(this.pagoCheque));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPagoCheque>>) {
        result.subscribe((res: HttpResponse<IPagoCheque>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackFormaDePagoById(index: number, item: IFormaDePago) {
        return item.id;
    }
    get pagoCheque() {
        return this._pagoCheque;
    }

    set pagoCheque(pagoCheque: IPagoCheque) {
        this._pagoCheque = pagoCheque;
    }
}
