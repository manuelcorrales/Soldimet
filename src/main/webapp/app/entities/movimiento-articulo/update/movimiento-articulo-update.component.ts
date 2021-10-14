import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMovimientoArticulo, MovimientoArticulo } from '../movimiento-articulo.model';
import { MovimientoArticuloService } from '../service/movimiento-articulo.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/service/movimiento.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

@Component({
  selector: 'jhi-movimiento-articulo-update',
  templateUrl: './movimiento-articulo-update.component.html',
})
export class MovimientoArticuloUpdateComponent implements OnInit {
  isSaving = false;

  articulosSharedCollection: IArticulo[] = [];
  movimientosSharedCollection: IMovimiento[] = [];
  medidaArticulosSharedCollection: IMedidaArticulo[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required, Validators.min(1)]],
    articulo: [null, Validators.required],
    movimiento: [],
    medida: [],
  });

  constructor(
    protected movimientoArticuloService: MovimientoArticuloService,
    protected articuloService: ArticuloService,
    protected movimientoService: MovimientoService,
    protected medidaArticuloService: MedidaArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoArticulo }) => {
      this.updateForm(movimientoArticulo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimientoArticulo = this.createFromForm();
    if (movimientoArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoArticuloService.update(movimientoArticulo));
    } else {
      this.subscribeToSaveResponse(this.movimientoArticuloService.create(movimientoArticulo));
    }
  }

  trackArticuloById(index: number, item: IArticulo): number {
    return item.id!;
  }

  trackMovimientoById(index: number, item: IMovimiento): number {
    return item.id!;
  }

  trackMedidaArticuloById(index: number, item: IMedidaArticulo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoArticulo>>): void {
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

  protected updateForm(movimientoArticulo: IMovimientoArticulo): void {
    this.editForm.patchValue({
      id: movimientoArticulo.id,
      cantidad: movimientoArticulo.cantidad,
      articulo: movimientoArticulo.articulo,
      movimiento: movimientoArticulo.movimiento,
      medida: movimientoArticulo.medida,
    });

    this.articulosSharedCollection = this.articuloService.addArticuloToCollectionIfMissing(
      this.articulosSharedCollection,
      movimientoArticulo.articulo
    );
    this.movimientosSharedCollection = this.movimientoService.addMovimientoToCollectionIfMissing(
      this.movimientosSharedCollection,
      movimientoArticulo.movimiento
    );
    this.medidaArticulosSharedCollection = this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(
      this.medidaArticulosSharedCollection,
      movimientoArticulo.medida
    );
  }

  protected loadRelationshipsOptions(): void {
    this.articuloService
      .query()
      .pipe(map((res: HttpResponse<IArticulo[]>) => res.body ?? []))
      .pipe(
        map((articulos: IArticulo[]) =>
          this.articuloService.addArticuloToCollectionIfMissing(articulos, this.editForm.get('articulo')!.value)
        )
      )
      .subscribe((articulos: IArticulo[]) => (this.articulosSharedCollection = articulos));

    this.movimientoService
      .query()
      .pipe(map((res: HttpResponse<IMovimiento[]>) => res.body ?? []))
      .pipe(
        map((movimientos: IMovimiento[]) =>
          this.movimientoService.addMovimientoToCollectionIfMissing(movimientos, this.editForm.get('movimiento')!.value)
        )
      )
      .subscribe((movimientos: IMovimiento[]) => (this.movimientosSharedCollection = movimientos));

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

  protected createFromForm(): IMovimientoArticulo {
    return {
      ...new MovimientoArticulo(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      articulo: this.editForm.get(['articulo'])!.value,
      movimiento: this.editForm.get(['movimiento'])!.value,
      medida: this.editForm.get(['medida'])!.value,
    };
  }
}
