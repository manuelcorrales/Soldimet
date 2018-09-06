import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IDetallePedido } from 'app/shared/model/detalle-pedido.model';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto';

@Component({
    selector: 'jhi-detalle-pedido-update',
    templateUrl: './detalle-pedido-update.component.html'
})
export class DetallePedidoUpdateComponent implements OnInit {
    private _detallePedido: IDetallePedido;
    isSaving: boolean;

    detallepresupuestos: IDetallePresupuesto[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private detallePedidoService: DetallePedidoService,
        private detallePresupuestoService: DetallePresupuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ detallePedido }) => {
            this.detallePedido = detallePedido;
        });
        this.detallePresupuestoService.query({ filter: 'detallepedido-is-null' }).subscribe(
            (res: HttpResponse<IDetallePresupuesto[]>) => {
                if (!this.detallePedido.detallePresupuesto || !this.detallePedido.detallePresupuesto.id) {
                    this.detallepresupuestos = res.body;
                } else {
                    this.detallePresupuestoService.find(this.detallePedido.detallePresupuesto.id).subscribe(
                        (subRes: HttpResponse<IDetallePresupuesto>) => {
                            this.detallepresupuestos = [subRes.body].concat(res.body);
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
        if (this.detallePedido.id !== undefined) {
            this.subscribeToSaveResponse(this.detallePedidoService.update(this.detallePedido));
        } else {
            this.subscribeToSaveResponse(this.detallePedidoService.create(this.detallePedido));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePedido>>) {
        result.subscribe((res: HttpResponse<IDetallePedido>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackDetallePresupuestoById(index: number, item: IDetallePresupuesto) {
        return item.id;
    }
    get detallePedido() {
        return this._detallePedido;
    }

    set detallePedido(detallePedido: IDetallePedido) {
        this._detallePedido = detallePedido;
    }
}
