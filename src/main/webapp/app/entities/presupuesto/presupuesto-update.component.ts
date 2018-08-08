import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from './presupuesto.service';
import { ICliente } from 'app/shared/model/cliente.model';
import { ClienteService } from 'app/entities/cliente';
import { IEstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto';

@Component({
    selector: 'jhi-presupuesto-update',
    templateUrl: './presupuesto-update.component.html'
})
export class PresupuestoUpdateComponent implements OnInit {
    private _presupuesto: IPresupuesto;
    isSaving: boolean;

    clientes: ICliente[];

    estadopresupuestos: IEstadoPresupuesto[];
    fechaCreacionDp: any;
    fechaAceptadoDp: any;
    fechaEntregadoDp: any;

    constructor(
        private jhiAlertService: JhiAlertService,
        private presupuestoService: PresupuestoService,
        private clienteService: ClienteService,
        private estadoPresupuestoService: EstadoPresupuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ presupuesto }) => {
            this.presupuesto = presupuesto;
        });
        this.clienteService.query().subscribe(
            (res: HttpResponse<ICliente[]>) => {
                this.clientes = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estadoPresupuestoService.query().subscribe(
            (res: HttpResponse<IEstadoPresupuesto[]>) => {
                this.estadopresupuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.presupuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.presupuestoService.update(this.presupuesto));
        } else {
            this.subscribeToSaveResponse(this.presupuestoService.create(this.presupuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<IPresupuesto>>) {
        result.subscribe((res: HttpResponse<IPresupuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackClienteById(index: number, item: ICliente) {
        return item.id;
    }

    trackEstadoPresupuestoById(index: number, item: IEstadoPresupuesto) {
        return item.id;
    }
    get presupuesto() {
        return this._presupuesto;
    }

    set presupuesto(presupuesto: IPresupuesto) {
        this._presupuesto = presupuesto;
    }
}
