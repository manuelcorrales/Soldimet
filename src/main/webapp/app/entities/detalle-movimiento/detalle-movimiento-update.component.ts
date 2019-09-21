import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetalleMovimiento, DetalleMovimiento } from 'app/shared/model/detalle-movimiento.model';
import { DetalleMovimientoService } from './detalle-movimiento.service';
import { ITipoDetalleMovimiento } from 'app/shared/model/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.service';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/pedido-repuesto.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';

@Component({
  selector: 'jhi-detalle-movimiento-update',
  templateUrl: './detalle-movimiento-update.component.html'
})
export class DetalleMovimientoUpdateComponent implements OnInit {
  isSaving: boolean;

  tipodetallemovimientos: ITipoDetalleMovimiento[];

  articulos: IArticulo[];

  pedidorepuestos: IPedidoRepuesto[];

  presupuestos: IPresupuesto[];

  editForm = this.fb.group({
    id: [],
    valorUnitario: [],
    cantidad: [null, [Validators.required, Validators.min(0)]],
    descripcion: [],
    tipoDetalleMovimiento: [null, Validators.required],
    articulo: [],
    pedidoRepuesto: [],
    presupuesto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detalleMovimientoService: DetalleMovimientoService,
    protected tipoDetalleMovimientoService: TipoDetalleMovimientoService,
    protected articuloService: ArticuloService,
    protected pedidoRepuestoService: PedidoRepuestoService,
    protected presupuestoService: PresupuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detalleMovimiento }) => {
      this.updateForm(detalleMovimiento);
    });
    this.tipoDetalleMovimientoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoDetalleMovimiento[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoDetalleMovimiento[]>) => response.body)
      )
      .subscribe(
        (res: ITipoDetalleMovimiento[]) => (this.tipodetallemovimientos = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.articuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticulo[]>) => response.body)
      )
      .subscribe((res: IArticulo[]) => (this.articulos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.pedidoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedidoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedidoRepuesto[]>) => response.body)
      )
      .subscribe((res: IPedidoRepuesto[]) => (this.pedidorepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.presupuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPresupuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPresupuesto[]>) => response.body)
      )
      .subscribe((res: IPresupuesto[]) => (this.presupuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(detalleMovimiento: IDetalleMovimiento) {
    this.editForm.patchValue({
      id: detalleMovimiento.id,
      valorUnitario: detalleMovimiento.valorUnitario,
      cantidad: detalleMovimiento.cantidad,
      descripcion: detalleMovimiento.descripcion,
      tipoDetalleMovimiento: detalleMovimiento.tipoDetalleMovimiento,
      articulo: detalleMovimiento.articulo,
      pedidoRepuesto: detalleMovimiento.pedidoRepuesto,
      presupuesto: detalleMovimiento.presupuesto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detalleMovimiento = this.createFromForm();
    if (detalleMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleMovimientoService.update(detalleMovimiento));
    } else {
      this.subscribeToSaveResponse(this.detalleMovimientoService.create(detalleMovimiento));
    }
  }

  private createFromForm(): IDetalleMovimiento {
    return {
      ...new DetalleMovimiento(),
      id: this.editForm.get(['id']).value,
      valorUnitario: this.editForm.get(['valorUnitario']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      tipoDetalleMovimiento: this.editForm.get(['tipoDetalleMovimiento']).value,
      articulo: this.editForm.get(['articulo']).value,
      pedidoRepuesto: this.editForm.get(['pedidoRepuesto']).value,
      presupuesto: this.editForm.get(['presupuesto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleMovimiento>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
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
}
