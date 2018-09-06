import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto';

@Component({
    selector: 'jhi-articulo-update',
    templateUrl: './articulo-update.component.html'
})
export class ArticuloUpdateComponent implements OnInit {
    private _articulo: IArticulo;
    isSaving: boolean;

    estadoarticulos: IEstadoArticulo[];

    marcas: IMarca[];

    tiporepuestos: ITipoRepuesto[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private articuloService: ArticuloService,
        private estadoArticuloService: EstadoArticuloService,
        private marcaService: MarcaService,
        private tipoRepuestoService: TipoRepuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ articulo }) => {
            this.articulo = articulo;
        });
        this.estadoArticuloService.query().subscribe(
            (res: HttpResponse<IEstadoArticulo[]>) => {
                this.estadoarticulos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.marcaService.query().subscribe(
            (res: HttpResponse<IMarca[]>) => {
                this.marcas = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
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
        if (this.articulo.id !== undefined) {
            this.subscribeToSaveResponse(this.articuloService.update(this.articulo));
        } else {
            this.subscribeToSaveResponse(this.articuloService.create(this.articulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IArticulo>>) {
        result.subscribe((res: HttpResponse<IArticulo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEstadoArticuloById(index: number, item: IEstadoArticulo) {
        return item.id;
    }

    trackMarcaById(index: number, item: IMarca) {
        return item.id;
    }

    trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
        return item.id;
    }
    get articulo() {
        return this._articulo;
    }

    set articulo(articulo: IArticulo) {
        this._articulo = articulo;
    }
}
