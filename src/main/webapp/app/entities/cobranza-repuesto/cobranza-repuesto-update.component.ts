import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto';

@Component({
    selector: 'jhi-cobranza-repuesto-update',
    templateUrl: './cobranza-repuesto-update.component.html'
})
export class CobranzaRepuestoUpdateComponent implements OnInit {
    private _cobranzaRepuesto: ICobranzaRepuesto;
    isSaving: boolean;

    tiporepuestos: ITipoRepuesto[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private cobranzaRepuestoService: CobranzaRepuestoService,
        private tipoRepuestoService: TipoRepuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
            this.cobranzaRepuesto = cobranzaRepuesto;
        });
        this.tipoRepuestoService.query().subscribe(
            (res: HttpResponse<ITipoRepuesto[]>) => {
                this.tiporepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.cobranzaRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.cobranzaRepuestoService.update(this.cobranzaRepuesto));
        } else {
            this.subscribeToSaveResponse(this.cobranzaRepuestoService.create(this.cobranzaRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaRepuesto>>) {
        result.subscribe((res: HttpResponse<ICobranzaRepuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
        return item.id;
    }
    get cobranzaRepuesto() {
        return this._cobranzaRepuesto;
    }

    set cobranzaRepuesto(cobranzaRepuesto: ICobranzaRepuesto) {
        this._cobranzaRepuesto = cobranzaRepuesto;
    }
}
