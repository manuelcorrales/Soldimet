import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from 'app/entities/costo-operacion';

@Component({
    selector: 'jhi-lista-precio-rectificacion-cram-update',
    templateUrl: './lista-precio-rectificacion-cram-update.component.html'
})
export class ListaPrecioRectificacionCRAMUpdateComponent implements OnInit {
    private _listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM;
    isSaving: boolean;

    costooperacions: ICostoOperacion[];
    fechaVigenciaDesdeDp: any;
    fechaVigenciaHastaDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
        private costoOperacionService: CostoOperacionService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
            this.listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
        });
        this.costoOperacionService.query().subscribe(
            (res: HttpResponse<ICostoOperacion[]>) => {
                this.costooperacions = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.listaPrecioRectificacionCRAM.id !== undefined) {
            this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.update(this.listaPrecioRectificacionCRAM));
        } else {
            this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.create(this.listaPrecioRectificacionCRAM));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioRectificacionCRAM>>) {
        result.subscribe(
            (res: HttpResponse<IListaPrecioRectificacionCRAM>) => this.onSaveSuccess(),
            (res: HttpErrorResponse) => this.onSaveError()
        );
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

    trackCostoOperacionById(index: number, item: ICostoOperacion) {
        return item.id;
    }
    get listaPrecioRectificacionCRAM() {
        return this._listaPrecioRectificacionCRAM;
    }

    set listaPrecioRectificacionCRAM(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM) {
        this._listaPrecioRectificacionCRAM = listaPrecioRectificacionCRAM;
    }
}
