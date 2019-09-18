import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento';

@Component({
    selector: 'jhi-movimiento-presupuesto-update',
    templateUrl: './movimiento-presupuesto-update.component.html'
})
export class MovimientoPresupuestoUpdateComponent implements OnInit {
    private _movimientoPresupuesto: IMovimientoPresupuesto;
    isSaving: boolean;

    presupuestos: IPresupuesto[];

    movimientos: IMovimiento[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private movimientoPresupuestoService: MovimientoPresupuestoService,
        private presupuestoService: PresupuestoService,
        private movimientoService: MovimientoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movimientoPresupuesto }) => {
            this.movimientoPresupuesto = movimientoPresupuesto;
        });
        this.presupuestoService.query().subscribe(
            (res: HttpResponse<IPresupuesto[]>) => {
                this.presupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.movimientoService.query({ filter: 'movimientopresupuesto-is-null' }).subscribe(
            (res: HttpResponse<IMovimiento[]>) => {
                if (!this.movimientoPresupuesto.movimiento || !this.movimientoPresupuesto.movimiento.id) {
                    this.movimientos = res.body;
                } else {
                    this.movimientoService.find(this.movimientoPresupuesto.movimiento.id).subscribe(
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
        if (this.movimientoPresupuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.movimientoPresupuestoService.update(this.movimientoPresupuesto));
        } else {
            this.subscribeToSaveResponse(this.movimientoPresupuestoService.create(this.movimientoPresupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoPresupuesto>>) {
        result.subscribe(
            (res: HttpResponse<IMovimientoPresupuesto>) => this.onSaveSuccess(),
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

    trackPresupuestoById(index: number, item: IPresupuesto) {
        return item.id;
    }

    trackMovimientoById(index: number, item: IMovimiento) {
        return item.id;
    }
    get movimientoPresupuesto() {
        return this._movimientoPresupuesto;
    }

    set movimientoPresupuesto(movimientoPresupuesto: IMovimientoPresupuesto) {
        this._movimientoPresupuesto = movimientoPresupuesto;
    }
}
