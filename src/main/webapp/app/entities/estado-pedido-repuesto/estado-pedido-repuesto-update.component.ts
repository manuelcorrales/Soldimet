import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
    selector: 'jhi-estado-pedido-repuesto-update',
    templateUrl: './estado-pedido-repuesto-update.component.html'
})
export class EstadoPedidoRepuestoUpdateComponent implements OnInit {
    private _estadoPedidoRepuesto: IEstadoPedidoRepuesto;
    isSaving: boolean;

    constructor(private estadoPedidoRepuestoService: EstadoPedidoRepuestoService, private activatedRoute: ActivatedRoute) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ estadoPedidoRepuesto }) => {
            this.estadoPedidoRepuesto = estadoPedidoRepuesto;
        });
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.estadoPedidoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.estadoPedidoRepuestoService.update(this.estadoPedidoRepuesto));
        } else {
            this.subscribeToSaveResponse(this.estadoPedidoRepuestoService.create(this.estadoPedidoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPedidoRepuesto>>) {
        result.subscribe(
            (res: HttpResponse<IEstadoPedidoRepuesto>) => this.onSaveSuccess(),
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
    get estadoPedidoRepuesto() {
        return this._estadoPedidoRepuesto;
    }

    set estadoPedidoRepuesto(estadoPedidoRepuesto: IEstadoPedidoRepuesto) {
        this._estadoPedidoRepuesto = estadoPedidoRepuesto;
    }
}
