import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { DATE_TIME_FORMAT } from 'app/shared/constants/input.constants';
import { JhiAlertService } from 'ng-jhipster';

import { ICaja } from 'app/shared/model/caja.model';
import { CajaService } from './caja.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal';

@Component({
    selector: 'jhi-caja-update',
    templateUrl: './caja-update.component.html'
})
export class CajaUpdateComponent implements OnInit {
    private _caja: ICaja;
    isSaving: boolean;

    sucursals: ISucursal[];
    fechaDp: any;
    horaApertura: string;
    horaCierre: string;

    constructor(
        private jhiAlertService: JhiAlertService,
        private cajaService: CajaService,
        private sucursalService: SucursalService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ caja }) => {
            this.caja = caja;
        });
        this.sucursalService.query().subscribe(
            (res: HttpResponse<ISucursal[]>) => {
                this.sucursals = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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

    private onError(errorMessage: string) {
        this.jhiAlertService.error(errorMessage, null, null);
    }

    trackSucursalById(index: number, item: ISucursal) {
        return item.id;
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
