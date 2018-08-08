import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { MovimientoArticuloService } from './movimiento-articulo.service';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento';

@Component({
    selector: 'jhi-movimiento-articulo-update',
    templateUrl: './movimiento-articulo-update.component.html'
})
export class MovimientoArticuloUpdateComponent implements OnInit {
    private _movimientoArticulo: IMovimientoArticulo;
    isSaving: boolean;

    articulos: IArticulo[];

    movimientos: IMovimiento[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private movimientoArticuloService: MovimientoArticuloService,
        private articuloService: ArticuloService,
        private movimientoService: MovimientoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movimientoArticulo }) => {
            this.movimientoArticulo = movimientoArticulo;
        });
        this.articuloService.query().subscribe(
            (res: HttpResponse<IArticulo[]>) => {
                this.articulos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.movimientoService.query({ filter: 'movimientoarticulo-is-null' }).subscribe(
            (res: HttpResponse<IMovimiento[]>) => {
                if (!this.movimientoArticulo.movimiento || !this.movimientoArticulo.movimiento.id) {
                    this.movimientos = res.body;
                } else {
                    this.movimientoService.find(this.movimientoArticulo.movimiento.id).subscribe(
                        (subRes: HttpResponse<IMovimiento>) => {
                            this.movimientos = [subRes.body].concat(res.body);
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
        if (this.movimientoArticulo.id !== undefined) {
            this.subscribeToSaveResponse(this.movimientoArticuloService.update(this.movimientoArticulo));
        } else {
            this.subscribeToSaveResponse(this.movimientoArticuloService.create(this.movimientoArticulo));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoArticulo>>) {
        result.subscribe((res: HttpResponse<IMovimientoArticulo>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackArticuloById(index: number, item: IArticulo) {
        return item.id;
    }

    trackMovimientoById(index: number, item: IMovimiento) {
        return item.id;
    }
    get movimientoArticulo() {
        return this._movimientoArticulo;
    }

    set movimientoArticulo(movimientoArticulo: IMovimientoArticulo) {
        this._movimientoArticulo = movimientoArticulo;
    }
}
