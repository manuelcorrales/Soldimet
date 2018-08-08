import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';

import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';

@Component({
    selector: 'jhi-caja-update',
    templateUrl: './caja-update.component.html'
})
export class CajaUpdateComponent implements OnInit {
    private _caja: ICaja;
    isSaving: boolean;
    fechaDp: any;
    horaApertura: string;
    horaCierre: string;

    constructor(private cajaService: CajaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ caja }) => {
            this.caja = caja;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        this.caja.horaApertura = moment(this.horaApertura, DATE_TIME_FORMAT);
        this.caja.horaCierre = moment(this.horaCierre, DATE_TIME_FORMAT);
        if (this.caja.id !== undefined) {
            this.subscribeToSaveResponse(this.cajaService.update(this.caja));
        } else {
            this.subscribeToSaveResponse(this.cajaService.create(this.caja));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICaja>>) {
        result.subscribe((res: HttpResponse<ICaja>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get caja() {
        return this._caja;
    }

    set caja(caja: ICaja) {
        this._caja = caja;
        this.horaApertura = moment(caja.horaApertura).format(DATE_TIME_FORMAT);
        this.horaCierre = moment(caja.horaCierre).format(DATE_TIME_FORMAT);
    }
}
