import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
    selector: 'jhi-estado-detalle-pedido-update',
    templateUrl: './estado-detalle-pedido-update.component.html'
})
export class EstadoDetallePedidoUpdateComponent implements OnInit {
    private _estadoDetallePedido: IEstadoDetallePedido;
    isSaving: boolean;

    constructor(private estadoDetallePedidoService: EstadoDetallePedidoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoDetallePedido }) => {
            this.estadoDetallePedido = estadoDetallePedido;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoDetallePedido.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoDetallePedidoService.update(this.estadoDetallePedido));
        } else {
            this.subscribeToSaveResponse(this.estadoDetallePedidoService.create(this.estadoDetallePedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoDetallePedido>>) {
        result.subscribe((res: HttpResponse<IEstadoDetallePedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
    }

    private onSaveSuccess() {
        this.isSaving = false;
        this.previousState();
    }

    private onSaveError() {
        this.isSaving = false;
    }
    get estadoDetallePedido() {
        return this._estadoDetallePedido;
    }

    set estadoDetallePedido(estadoDetallePedido: IEstadoDetallePedido) {
        this._estadoDetallePedido = estadoDetallePedido;
    }
}
