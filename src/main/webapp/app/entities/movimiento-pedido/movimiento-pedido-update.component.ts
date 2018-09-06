import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IMovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { MovimientoPedidoService } from 'app/entities/movimiento-pedido/movimiento-pedido.service';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento';

@Component({
    selector: 'jhi-movimiento-pedido-update',
    templateUrl: './movimiento-pedido-update.component.html'
})
export class MovimientoPedidoUpdateComponent implements OnInit {
    private _movimientoPedido: IMovimientoPedido;
    isSaving: boolean;

    pedidorepuestos: IPedidoRepuesto[];

    movimientos: IMovimiento[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private movimientoPedidoService: MovimientoPedidoService,
        private pedidoRepuestoService: PedidoRepuestoService,
        private movimientoService: MovimientoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ movimientoPedido }) => {
            this.movimientoPedido = movimientoPedido;
        });
        this.pedidoRepuestoService.query().subscribe(
            (res: HttpResponse<IPedidoRepuesto[]>) => {
                this.pedidorepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.movimientoService.query({ filter: 'movimientopedido-is-null' }).subscribe(
            (res: HttpResponse<IMovimiento[]>) => {
                if (!this.movimientoPedido.movimiento || !this.movimientoPedido.movimiento.id) {
                    this.movimientos = res.body;
                } else {
                    this.movimientoService.find(this.movimientoPedido.movimiento.id).subscribe(
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
        if (this.movimientoPedido.id !== undefined) {
            this.subscribeToSaveResponse(this.movimientoPedidoService.update(this.movimientoPedido));
        } else {
            this.subscribeToSaveResponse(this.movimientoPedidoService.create(this.movimientoPedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoPedido>>) {
        result.subscribe((res: HttpResponse<IMovimientoPedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackPedidoRepuestoById(index: number, item: IPedidoRepuesto) {
        return item.id;
    }

    trackMovimientoById(index: number, item: IMovimiento) {
        return item.id;
    }
    get movimientoPedido() {
        return this._movimientoPedido;
    }

    set movimientoPedido(movimientoPedido: IMovimientoPedido) {
        this._movimientoPedido = movimientoPedido;
    }
}
