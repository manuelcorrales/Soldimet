import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';
import { JhiAlertService } from 'ng-jhipster';

import { ICostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo';
import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from 'app/entities/proveedor';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto';

@Component({
    selector: 'jhi-costo-repuesto-update',
    templateUrl: './costo-repuesto-update.component.html'
})
export class CostoRepuestoUpdateComponent implements OnInit {
    private _costoRepuesto: ICostoRepuesto;
    isSaving: boolean;

    tiporepuestos: ITipoRepuesto[];

    articulos: IArticulo[];

    proveedors: IProveedor[];

    estadocostorepuestos: IEstadoCostoRepuesto[];

    constructor(
        private jhiAlertService: JhiAlertService,
        private costoRepuestoService: CostoRepuestoService,
        private tipoRepuestoService: TipoRepuestoService,
        private articuloService: ArticuloService,
        private proveedorService: ProveedorService,
        private estadoCostoRepuestoService: EstadoCostoRepuestoService,
        private activatedRoute: ActivatedRoute
    ) {}

    ngOnInit() {
        this.isSaving = false;
        this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
            this.costoRepuesto = costoRepuesto;
        });
        this.tipoRepuestoService.query().subscribe(
            (res: HttpResponse<ITipoRepuesto[]>) => {
                this.tiporepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.articuloService.query().subscribe(
            (res: HttpResponse<IArticulo[]>) => {
                this.articulos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.proveedorService.query().subscribe(
            (res: HttpResponse<IProveedor[]>) => {
                this.proveedors = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        this.estadoCostoRepuestoService.query().subscribe(
            (res: HttpResponse<IEstadoCostoRepuesto[]>) => {
                this.estadocostorepuestos = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
    }

    previousState() {
        window.history.back();
    }

    save() {
        this.isSaving = true;
        if (this.costoRepuesto.id !== undefined) {
            this.subscribeToSaveResponse(this.costoRepuestoService.update(this.costoRepuesto));
        } else {
            this.subscribeToSaveResponse(this.costoRepuestoService.create(this.costoRepuesto));
        }
    }

    private subscribeToSaveResponse(result: Observable<HttpResponse<ICostoRepuesto>>) {
        result.subscribe((res: HttpResponse<ICostoRepuesto>) => this.onSaveSuccess(), (res: HttpErrorResponse) => this.onSaveError());
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

    trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
        return item.id;
    }

    trackArticuloById(index: number, item: IArticulo) {
        return item.id;
    }

    trackProveedorById(index: number, item: IProveedor) {
        return item.id;
    }

    trackEstadoCostoRepuestoById(index: number, item: IEstadoCostoRepuesto) {
        return item.id;
    }
    get costoRepuesto() {
        return this._costoRepuesto;
    }

    set costoRepuesto(costoRepuesto: ICostoRepuesto) {
        this._costoRepuesto = costoRepuesto;
    }
}
