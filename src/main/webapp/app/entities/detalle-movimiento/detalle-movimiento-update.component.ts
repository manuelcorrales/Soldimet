import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from 'app/entities/detalle-movimiento/detalle-movimiento.service';
import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto';

@Component({
    selector: 'jhi-detalle-movimiento-update',
    templateUrl: './detalle-movimiento-update.component.html'
})
export class DetalleMovimientoUpdateComponent implements OnInit {
    private _detalleMovimiento: IDetalleMovimiento;
    isSaving: boolean;

    tipodetallemovimientos: ITipoDetalleMovimiento[];

    articulos: IArticulo[];

    pedidorepuestos: IPedidoRepuesto[];

    presupuestos: IPresupuesto[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private detalleMovimientoService: DetalleMovimientoService,
        private tipoDetalleMovimientoService: TipoDetalleMovimientoService,
        private articuloService: ArticuloService,
        private pedidoRepuestoService: PedidoRepuestoService,
        private presupuestoService: PresupuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ detalleMovimiento }) => {
            this.detalleMovimiento = detalleMovimiento;
        });
        this.tipoDetalleMovimientoService.query().subscribe(
            (res: HttpResponse<ITipoDetalleMovimiento[]>) => {
                this.tipodetallemovimientos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.articuloService.query().subscribe(
            (res: HttpResponse<IArticulo[]>) => {
                this.articulos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.pedidoRepuestoService.query().subscribe(
            (res: HttpResponse<IPedidoRepuesto[]>) => {
                this.pedidorepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.presupuestoService.query().subscribe(
            (res: HttpResponse<IPresupuesto[]>) => {
                this.presupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.detalleMovimiento.id !== undefined) {
            this.subscribeToSaveResponse(this.detalleMovimientoService.update(this.detalleMovimiento));
        } else {
            this.subscribeToSaveResponse(this.detalleMovimientoService.create(this.detalleMovimiento));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleMovimiento>>) {
        result.subscribe((res: HttpResponse<IDetalleMovimiento>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoDetalleMovimientoById(index: number, item: ITipoDetalleMovimiento) {
        return item.id;
    }

    trackArticuloById(index: number, item: IArticulo) {
        return item.id;
    }

    trackPedidoRepuestoById(index: number, item: IPedidoRepuesto) {
        return item.id;
    }

    trackPresupuestoById(index: number, item: IPresupuesto) {
        return item.id;
    }
    get detalleMovimiento() {
        return this._detalleMovimiento;
    }

    set detalleMovimiento(detalleMovimiento: IDetalleMovimiento) {
        this._detalleMovimiento = detalleMovimiento;
    }
}
