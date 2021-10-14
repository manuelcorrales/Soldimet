import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMovimiento, Movimiento } from '../movimiento.model';
import { MovimientoService } from '../service/movimiento.service';
import { IMedioDePago } from 'app/entities/medio-de-pago/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago/service/medio-de-pago.service';
import { IEstadoMovimiento } from 'app/entities/estado-movimiento/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/service/estado-movimiento.service';
import { ITipoMovimiento } from 'app/entities/tipo-movimiento/tipo-movimiento.model';
import { TipoMovimientoService } from 'app/entities/tipo-movimiento/service/tipo-movimiento.service';
import { IEmpleado } from 'app/entities/empleado/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/service/empleado.service';
import { ICaja } from 'app/entities/caja/caja.model';
import { CajaService } from 'app/entities/caja/service/caja.service';
import { ISubCategoria } from 'app/entities/sub-categoria/sub-categoria.model';
import { SubCategoriaService } from 'app/entities/sub-categoria/service/sub-categoria.service';

@Component({
  selector: 'jhi-movimiento-update',
  templateUrl: './movimiento-update.component.html',
})
export class MovimientoUpdateComponent implements OnInit {
  isSaving = false;

  medioDePagosCollection: IMedioDePago[] = [];
  estadoMovimientosSharedCollection: IEstadoMovimiento[] = [];
  tipoMovimientosSharedCollection: ITipoMovimiento[] = [];
  empleadosSharedCollection: IEmpleado[] = [];
  cajasSharedCollection: ICaja[] = [];
  subCategoriasSharedCollection: ISubCategoria[] = [];

  editForm = this.fb.group({
    id: [],
    fecha: [null, [Validators.required]],
    importe: [null, [Validators.required]],
    descuento: [],
    observaciones: [],
    medioDePago: [],
    estado: [null, Validators.required],
    tipoMovimiento: [null, Validators.required],
    empleado: [null, Validators.required],
    caja: [],
    subCategoria: [],
  });

  constructor(
    protected movimientoService: MovimientoService,
    protected medioDePagoService: MedioDePagoService,
    protected estadoMovimientoService: EstadoMovimientoService,
    protected tipoMovimientoService: TipoMovimientoService,
    protected empleadoService: EmpleadoService,
    protected cajaService: CajaService,
    protected subCategoriaService: SubCategoriaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimiento }) => {
      this.updateForm(movimiento);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimiento = this.createFromForm();
    if (movimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoService.update(movimiento));
    } else {
      this.subscribeToSaveResponse(this.movimientoService.create(movimiento));
    }
  }

  trackMedioDePagoById(index: number, item: IMedioDePago): number {
    return item.id!;
  }

  trackEstadoMovimientoById(index: number, item: IEstadoMovimiento): number {
    return item.id!;
  }

  trackTipoMovimientoById(index: number, item: ITipoMovimiento): number {
    return item.id!;
  }

  trackEmpleadoById(index: number, item: IEmpleado): number {
    return item.id!;
  }

  trackCajaById(index: number, item: ICaja): number {
    return item.id!;
  }

  trackSubCategoriaById(index: number, item: ISubCategoria): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimiento>>): void {
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

  protected updateForm(movimiento: IMovimiento): void {
    this.editForm.patchValue({
      id: movimiento.id,
      fecha: movimiento.fecha,
      importe: movimiento.importe,
      descuento: movimiento.descuento,
      observaciones: movimiento.observaciones,
      medioDePago: movimiento.medioDePago,
      estado: movimiento.estado,
      tipoMovimiento: movimiento.tipoMovimiento,
      empleado: movimiento.empleado,
      caja: movimiento.caja,
      subCategoria: movimiento.subCategoria,
    });

    this.medioDePagosCollection = this.medioDePagoService.addMedioDePagoToCollectionIfMissing(
      this.medioDePagosCollection,
      movimiento.medioDePago
    );
    this.estadoMovimientosSharedCollection = this.estadoMovimientoService.addEstadoMovimientoToCollectionIfMissing(
      this.estadoMovimientosSharedCollection,
      movimiento.estado
    );
    this.tipoMovimientosSharedCollection = this.tipoMovimientoService.addTipoMovimientoToCollectionIfMissing(
      this.tipoMovimientosSharedCollection,
      movimiento.tipoMovimiento
    );
    this.empleadosSharedCollection = this.empleadoService.addEmpleadoToCollectionIfMissing(
      this.empleadosSharedCollection,
      movimiento.empleado
    );
    this.cajasSharedCollection = this.cajaService.addCajaToCollectionIfMissing(this.cajasSharedCollection, movimiento.caja);
    this.subCategoriasSharedCollection = this.subCategoriaService.addSubCategoriaToCollectionIfMissing(
      this.subCategoriasSharedCollection,
      movimiento.subCategoria
    );
  }

  protected loadRelationshipsOptions(): void {
    this.medioDePagoService
      .query({ filter: 'movimiento-is-null' })
      .pipe(map((res: HttpResponse<IMedioDePago[]>) => res.body ?? []))
      .pipe(
        map((medioDePagos: IMedioDePago[]) =>
          this.medioDePagoService.addMedioDePagoToCollectionIfMissing(medioDePagos, this.editForm.get('medioDePago')!.value)
        )
      )
      .subscribe((medioDePagos: IMedioDePago[]) => (this.medioDePagosCollection = medioDePagos));

    this.estadoMovimientoService
      .query()
      .pipe(map((res: HttpResponse<IEstadoMovimiento[]>) => res.body ?? []))
      .pipe(
        map((estadoMovimientos: IEstadoMovimiento[]) =>
          this.estadoMovimientoService.addEstadoMovimientoToCollectionIfMissing(estadoMovimientos, this.editForm.get('estado')!.value)
        )
      )
      .subscribe((estadoMovimientos: IEstadoMovimiento[]) => (this.estadoMovimientosSharedCollection = estadoMovimientos));

    this.tipoMovimientoService
      .query()
      .pipe(map((res: HttpResponse<ITipoMovimiento[]>) => res.body ?? []))
      .pipe(
        map((tipoMovimientos: ITipoMovimiento[]) =>
          this.tipoMovimientoService.addTipoMovimientoToCollectionIfMissing(tipoMovimientos, this.editForm.get('tipoMovimiento')!.value)
        )
      )
      .subscribe((tipoMovimientos: ITipoMovimiento[]) => (this.tipoMovimientosSharedCollection = tipoMovimientos));

    this.empleadoService
      .query()
      .pipe(map((res: HttpResponse<IEmpleado[]>) => res.body ?? []))
      .pipe(
        map((empleados: IEmpleado[]) =>
          this.empleadoService.addEmpleadoToCollectionIfMissing(empleados, this.editForm.get('empleado')!.value)
        )
      )
      .subscribe((empleados: IEmpleado[]) => (this.empleadosSharedCollection = empleados));

    this.cajaService
      .query()
      .pipe(map((res: HttpResponse<ICaja[]>) => res.body ?? []))
      .pipe(map((cajas: ICaja[]) => this.cajaService.addCajaToCollectionIfMissing(cajas, this.editForm.get('caja')!.value)))
      .subscribe((cajas: ICaja[]) => (this.cajasSharedCollection = cajas));

    this.subCategoriaService
      .query()
      .pipe(map((res: HttpResponse<ISubCategoria[]>) => res.body ?? []))
      .pipe(
        map((subCategorias: ISubCategoria[]) =>
          this.subCategoriaService.addSubCategoriaToCollectionIfMissing(subCategorias, this.editForm.get('subCategoria')!.value)
        )
      )
      .subscribe((subCategorias: ISubCategoria[]) => (this.subCategoriasSharedCollection = subCategorias));
  }

  protected createFromForm(): IMovimiento {
    return {
      ...new Movimiento(),
      id: this.editForm.get(['id'])!.value,
      fecha: this.editForm.get(['fecha'])!.value,
      importe: this.editForm.get(['importe'])!.value,
      descuento: this.editForm.get(['descuento'])!.value,
      observaciones: this.editForm.get(['observaciones'])!.value,
      medioDePago: this.editForm.get(['medioDePago'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      tipoMovimiento: this.editForm.get(['tipoMovimiento'])!.value,
      empleado: this.editForm.get(['empleado'])!.value,
      caja: this.editForm.get(['caja'])!.value,
      subCategoria: this.editForm.get(['subCategoria'])!.value,
    };
  }
}
