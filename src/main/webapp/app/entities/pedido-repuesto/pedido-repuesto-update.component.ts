import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/pedido-repuesto.service';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type';

@Component({
    selector: 'jhi-pedido-repuesto-update',
    templateUrl: './pedido-repuesto-update.component.html'
})
export class PedidoRepuestoUpdateComponent implements OnInit {
    private _pedidoRepuesto: IPedidoRepuesto;
    isSaving: boolean;

    estadopedidorepuestos: IEstadoPedidoRepuesto[];

    presupuestos: IPresupuesto[];

    documentationtypes: IDocumentationType[];
    fechaCreacionDp: any;
    fechaPedidoDp: any;
    fechaReciboDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private pedidoRepuestoService: PedidoRepuestoService,
        private estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
        private presupuestoService: PresupuestoService,
        private documentationTypeService: DocumentationTypeService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ pedidoRepuesto }) => {
            this.pedidoRepuesto = pedidoRepuesto;
        });
        this.estadoPedidoRepuestoService.query().subscribe(
            (res: HttpResponse<IEstadoPedidoRepuesto[]>) => {
                this.estadopedidorepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.presupuestoService.query().subscribe(
            (res: HttpResponse<IPresupuesto[]>) => {
                this.presupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.documentationTypeService.query().subscribe(
            (res: HttpResponse<IDocumentationType[]>) => {
                this.documentationtypes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.pedidoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.pedidoRepuestoService.update(this.pedidoRepuesto));
        } else {
            this.subscribeToSaveResponse(this.pedidoRepuestoService.create(this.pedidoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPedidoRepuesto>>) {
        result.subscribe((res: HttpResponse<IPedidoRepuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackEstadoPedidoRepuestoById(index: number, item: IEstadoPedidoRepuesto) {
        return item.id;
    }

    trackPresupuestoById(index: number, item: IPresupuesto) {
        return item.id;
    }

    trackDocumentationTypeById(index: number, item: IDocumentationType) {
        return item.id;
    }
    get pedidoRepuesto() {
        return this._pedidoRepuesto;
    }

    set pedidoRepuesto(pedidoRepuesto: IPedidoRepuesto) {
        this._pedidoRepuesto = pedidoRepuesto;
    }
}
