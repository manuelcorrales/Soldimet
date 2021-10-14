import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IMovimientoPresupuesto, MovimientoPresupuesto } from '../movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from '../service/movimiento-presupuesto.service';
import { IMovimiento } from 'app/entities/movimiento/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/service/movimiento.service';
import { IPresupuesto } from 'app/entities/presupuesto/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/service/presupuesto.service';

@Component({
  selector: 'jhi-movimiento-presupuesto-update',
  templateUrl: './movimiento-presupuesto-update.component.html',
})
export class MovimientoPresupuestoUpdateComponent implements OnInit {
  isSaving = false;

  movimientosCollection: IMovimiento[] = [];
  presupuestosSharedCollection: IPresupuesto[] = [];

  editForm = this.fb.group({
    id: [],
    movimiento: [null, Validators.required],
    presupuesto: [null, Validators.required],
  });

  constructor(
    protected movimientoPresupuestoService: MovimientoPresupuestoService,
    protected movimientoService: MovimientoService,
    protected presupuestoService: PresupuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ movimientoPresupuesto }) => {
      this.updateForm(movimientoPresupuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const movimientoPresupuesto = this.createFromForm();
    if (movimientoPresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoPresupuestoService.update(movimientoPresupuesto));
    } else {
      this.subscribeToSaveResponse(this.movimientoPresupuestoService.create(movimientoPresupuesto));
    }
  }

  trackMovimientoById(index: number, item: IMovimiento): number {
    return item.id!;
  }

  trackPresupuestoById(index: number, item: IPresupuesto): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoPresupuesto>>): void {
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

  protected updateForm(movimientoPresupuesto: IMovimientoPresupuesto): void {
    this.editForm.patchValue({
      id: movimientoPresupuesto.id,
      movimiento: movimientoPresupuesto.movimiento,
      presupuesto: movimientoPresupuesto.presupuesto,
    });

    this.movimientosCollection = this.movimientoService.addMovimientoToCollectionIfMissing(
      this.movimientosCollection,
      movimientoPresupuesto.movimiento
    );
    this.presupuestosSharedCollection = this.presupuestoService.addPresupuestoToCollectionIfMissing(
      this.presupuestosSharedCollection,
      movimientoPresupuesto.presupuesto
    );
  }

  protected loadRelationshipsOptions(): void {
    this.movimientoService
      .query({ filter: 'movimientopresupuesto-is-null' })
      .pipe(map((res: HttpResponse<IMovimiento[]>) => res.body ?? []))
      .pipe(
        map((movimientos: IMovimiento[]) =>
          this.movimientoService.addMovimientoToCollectionIfMissing(movimientos, this.editForm.get('movimiento')!.value)
        )
      )
      .subscribe((movimientos: IMovimiento[]) => (this.movimientosCollection = movimientos));

    this.presupuestoService
      .query()
      .pipe(map((res: HttpResponse<IPresupuesto[]>) => res.body ?? []))
      .pipe(
        map((presupuestos: IPresupuesto[]) =>
          this.presupuestoService.addPresupuestoToCollectionIfMissing(presupuestos, this.editForm.get('presupuesto')!.value)
        )
      )
      .subscribe((presupuestos: IPresupuesto[]) => (this.presupuestosSharedCollection = presupuestos));
  }

  protected createFromForm(): IMovimientoPresupuesto {
    return {
      ...new MovimientoPresupuesto(),
      id: this.editForm.get(['id'])!.value,
      movimiento: this.editForm.get(['movimiento'])!.value,
      presupuesto: this.editForm.get(['presupuesto'])!.value,
    };
  }
}
