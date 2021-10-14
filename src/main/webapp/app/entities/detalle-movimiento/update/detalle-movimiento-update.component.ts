import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDetalleMovimiento, DetalleMovimiento } from '../detalle-movimiento.model';
import { DetalleMovimientoService } from '../service/detalle-movimiento.service';
import { ITipoDetalleMovimiento } from 'app/entities/tipo-detalle-movimiento/tipo-detalle-movimiento.model';
import { TipoDetalleMovimientoService } from 'app/entities/tipo-detalle-movimiento/service/tipo-detalle-movimiento.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { IPedidoRepuesto } from 'app/entities/pedido-repuesto/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/service/pedido-repuesto.service';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/service/presupuesto.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

@Component({
  selector: 'jhi-detalle-movimiento-update',
  templateUrl: './detalle-movimiento-update.component.html',
})
export class DetalleMovimientoUpdateComponent implements OnInit {
  isSaving = false;

  tipoDetalleMovimientosSharedCollection: ITipoDetalleMovimiento[] = [];
  articulosSharedCollection: IArticulo[] = [];
  pedidoRepuestosSharedCollection: IPedidoRepuesto[] = [];
  presupuestosSharedCollection: IPresupuesto[] = [];
  medidaArticulosSharedCollection: IMedidaArticulo[] = [];

  editForm = this.fb.group({
    id: [],
    valorUnitario: [],
    cantidad: [null, [Validators.required, Validators.min(0)]],
    descripcion: [],
    tipoDetalleMovimiento: [null, Validators.required],
    articulo: [],
    pedidoRepuesto: [],
    presupuesto: [],
    medida: [],
  });

  constructor(
    protected detalleMovimientoService: DetalleMovimientoService,
    protected tipoDetalleMovimientoService: TipoDetalleMovimientoService,
    protected articuloService: ArticuloService,
    protected pedidoRepuestoService: PedidoRepuestoService,
    protected presupuestoService: PresupuestoService,
    protected medidaArticuloService: MedidaArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detalleMovimiento }) => {
      this.updateForm(detalleMovimiento);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detalleMovimiento = this.createFromForm();
    if (detalleMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.detalleMovimientoService.update(detalleMovimiento));
    } else {
      this.subscribeToSaveResponse(this.detalleMovimientoService.create(detalleMovimiento));
    }
  }

  trackTipoDetalleMovimientoById(index: number, item: ITipoDetalleMovimiento): number {
    return item.id!;
  }

  trackArticuloById(index: number, item: IArticulo): number {
    return item.id!;
  }

  trackPedidoRepuestoById(index: number, item: IPedidoRepuesto): number {
    return item.id!;
  }

  trackPresupuestoById(index: number, item: IPresupuesto): number {
    return item.id!;
  }

  trackMedidaArticuloById(index: number, item: IMedidaArticulo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetalleMovimiento>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(detalleMovimiento: IDetalleMovimiento): void {
    this.editForm.patchValue({
      id: detalleMovimiento.id,
      valorUnitario: detalleMovimiento.valorUnitario,
      cantidad: detalleMovimiento.cantidad,
      descripcion: detalleMovimiento.descripcion,
      tipoDetalleMovimiento: detalleMovimiento.tipoDetalleMovimiento,
      articulo: detalleMovimiento.articulo,
      pedidoRepuesto: detalleMovimiento.pedidoRepuesto,
      presupuesto: detalleMovimiento.presupuesto,
      medida: detalleMovimiento.medida,
    });

    this.tipoDetalleMovimientosSharedCollection = this.tipoDetalleMovimientoService.addTipoDetalleMovimientoToCollectionIfMissing(
      this.tipoDetalleMovimientosSharedCollection,
      detalleMovimiento.tipoDetalleMovimiento
    );
    this.articulosSharedCollection = this.articuloService.addArticuloToCollectionIfMissing(
      this.articulosSharedCollection,
      detalleMovimiento.articulo
    );
    this.pedidoRepuestosSharedCollection = this.pedidoRepuestoService.addPedidoRepuestoToCollectionIfMissing(
      this.pedidoRepuestosSharedCollection,
      detalleMovimiento.pedidoRepuesto
    );
    this.presupuestosSharedCollection = this.presupuestoService.addPresupuestoToCollectionIfMissing(
      this.presupuestosSharedCollection,
      detalleMovimiento.presupuesto
    );
    this.medidaArticulosSharedCollection = this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(
      this.medidaArticulosSharedCollection,
      detalleMovimiento.medida
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoDetalleMovimientoService
      .query()
      .pipe(map((res: HttpResponse<ITipoDetalleMovimiento[]>) => res.body ?? []))
      .pipe(
        map((tipoDetalleMovimientos: ITipoDetalleMovimiento[]) =>
          this.tipoDetalleMovimientoService.addTipoDetalleMovimientoToCollectionIfMissing(
            tipoDetalleMovimientos,
            this.editForm.get('tipoDetalleMovimiento')!.value
          )
        )
      )
      .subscribe(
        (tipoDetalleMovimientos: ITipoDetalleMovimiento[]) => (this.tipoDetalleMovimientosSharedCollection = tipoDetalleMovimientos)
      );

    this.articuloService
      .query()
      .pipe(map((res: HttpResponse<IArticulo[]>) => res.body ?? []))
      .pipe(
        map((articulos: IArticulo[]) =>
          this.articuloService.addArticuloToCollectionIfMissing(articulos, this.editForm.get('articulo')!.value)
        )
      )
      .subscribe((articulos: IArticulo[]) => (this.articulosSharedCollection = articulos));

    this.pedidoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<IPedidoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((pedidoRepuestos: IPedidoRepuesto[]) =>
          this.pedidoRepuestoService.addPedidoRepuestoToCollectionIfMissing(pedidoRepuestos, this.editForm.get('pedidoRepuesto')!.value)
        )
      )
      .subscribe((pedidoRepuestos: IPedidoRepuesto[]) => (this.pedidoRepuestosSharedCollection = pedidoRepuestos));

    this.presupuestoService
      .query()
      .pipe(map((res: HttpResponse<IPresupuesto[]>) => res.body ?? []))
      .pipe(
        map((presupuestos: IPresupuesto[]) =>
          this.presupuestoService.addPresupuestoToCollectionIfMissing(presupuestos, this.editForm.get('presupuesto')!.value)
        )
      )
      .subscribe((presupuestos: IPresupuesto[]) => (this.presupuestosSharedCollection = presupuestos));

    this.medidaArticuloService
      .query()
      .pipe(map((res: HttpResponse<IMedidaArticulo[]>) => res.body ?? []))
      .pipe(
        map((medidaArticulos: IMedidaArticulo[]) =>
          this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(medidaArticulos, this.editForm.get('medida')!.value)
        )
      )
      .subscribe((medidaArticulos: IMedidaArticulo[]) => (this.medidaArticulosSharedCollection = medidaArticulos));
  }

  protected createFromForm(): IDetalleMovimiento {
    return {
      ...new DetalleMovimiento(),
      id: this.editForm.get(['id'])!.value,
      valorUnitario: this.editForm.get(['valorUnitario'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      descripcion: this.editForm.get(['descripcion'])!.value,
      tipoDetalleMovimiento: this.editForm.get(['tipoDetalleMovimiento'])!.value,
      articulo: this.editForm.get(['articulo'])!.value,
      pedidoRepuesto: this.editForm.get(['pedidoRepuesto'])!.value,
      presupuesto: this.editForm.get(['presupuesto'])!.value,
      medida: this.editForm.get(['medida'])!.value,
    };
  }
}
