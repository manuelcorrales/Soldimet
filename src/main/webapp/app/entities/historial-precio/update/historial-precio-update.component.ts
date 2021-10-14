import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IHistorialPrecio, HistorialPrecio } from '../historial-precio.model';
import { HistorialPrecioService } from '../service/historial-precio.service';
import { IPrecioRepuesto } from 'app/entities/precio-repuesto/precio-repuesto.model';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/service/precio-repuesto.service';

@Component({
  selector: 'jhi-historial-precio-update',
  templateUrl: './historial-precio-update.component.html',
})
export class HistorialPrecioUpdateComponent implements OnInit {
  isSaving = false;

  precioRepuestosCollection: IPrecioRepuesto[] = [];

  editForm = this.fb.group({
    id: [],
    fechaHistorial: [null, [Validators.required]],
    precioRepuesto: [null, Validators.required],
  });

  constructor(
    protected historialPrecioService: HistorialPrecioService,
    protected precioRepuestoService: PrecioRepuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ historialPrecio }) => {
      this.updateForm(historialPrecio);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const historialPrecio = this.createFromForm();
    if (historialPrecio.id !== undefined) {
      this.subscribeToSaveResponse(this.historialPrecioService.update(historialPrecio));
    } else {
      this.subscribeToSaveResponse(this.historialPrecioService.create(historialPrecio));
    }
  }

  trackPrecioRepuestoById(index: number, item: IPrecioRepuesto): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistorialPrecio>>): void {
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

  protected updateForm(historialPrecio: IHistorialPrecio): void {
    this.editForm.patchValue({
      id: historialPrecio.id,
      fechaHistorial: historialPrecio.fechaHistorial,
      precioRepuesto: historialPrecio.precioRepuesto,
    });

    this.precioRepuestosCollection = this.precioRepuestoService.addPrecioRepuestoToCollectionIfMissing(
      this.precioRepuestosCollection,
      historialPrecio.precioRepuesto
    );
  }

  protected loadRelationshipsOptions(): void {
    this.precioRepuestoService
      .query({ filter: 'historialprecio-is-null' })
      .pipe(map((res: HttpResponse<IPrecioRepuesto[]>) => res.body ?? []))
      .pipe(
        map((precioRepuestos: IPrecioRepuesto[]) =>
          this.precioRepuestoService.addPrecioRepuestoToCollectionIfMissing(precioRepuestos, this.editForm.get('precioRepuesto')!.value)
        )
      )
      .subscribe((precioRepuestos: IPrecioRepuesto[]) => (this.precioRepuestosCollection = precioRepuestos));
  }

  protected createFromForm(): IHistorialPrecio {
    return {
      ...new HistorialPrecio(),
      id: this.editForm.get(['id'])!.value,
      fechaHistorial: this.editForm.get(['fechaHistorial'])!.value,
      precioRepuesto: this.editForm.get(['precioRepuesto'])!.value,
    };
  }
}
