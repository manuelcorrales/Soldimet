import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';

@Component({
    selector: 'jhi-lista-precio-desde-hasta-update',
    templateUrl: './lista-precio-desde-hasta-update.component.html'
})
export class ListaPrecioDesdeHastaUpdateComponent implements OnInit {
    private _listaPrecioDesdeHasta: IListaPrecioDesdeHasta;
    isSaving: boolean;
    fechaDesdeDp: any;
    fechaHastaDp: any;

    constructor(private listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ listaPrecioDesdeHasta }) => {
            this.listaPrecioDesdeHasta = listaPrecioDesdeHasta;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.listaPrecioDesdeHasta.id !== undefined) {
            this.subscribeToSaveResponse(this.listaPrecioDesdeHastaService.update(this.listaPrecioDesdeHasta));
        } else {
            this.subscribeToSaveResponse(this.listaPrecioDesdeHastaService.create(this.listaPrecioDesdeHasta));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioDesdeHasta>>) {
        result.subscribe(
            (res: HttpResponse<IListaPrecioDesdeHasta>) => this.onSaveSuccess(),
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
    get listaPrecioDesdeHasta() {
        return this._listaPrecioDesdeHasta;
    }

    set listaPrecioDesdeHasta(listaPrecioDesdeHasta: IListaPrecioDesdeHasta) {
        this._listaPrecioDesdeHasta = listaPrecioDesdeHasta;
    }
}
