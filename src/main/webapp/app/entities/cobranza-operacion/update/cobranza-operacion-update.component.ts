import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICobranzaOperacion, CobranzaOperacion } from '../cobranza-operacion.model';
import { CobranzaOperacionService } from '../service/cobranza-operacion.service';
import { IEstadoCobranzaOperacion } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/service/estado-cobranza-operacion.service';
import { IOperacion } from 'app/entities/operacion/operacion.model';
import { OperacionService } from 'app/entities/operacion/service/operacion.service';

@Component({
  selector: 'jhi-cobranza-operacion-update',
  templateUrl: './cobranza-operacion-update.component.html',
})
export class CobranzaOperacionUpdateComponent implements OnInit {
  isSaving = false;

  estadoCobranzaOperacionsSharedCollection: IEstadoCobranzaOperacion[] = [];
  operacionsSharedCollection: IOperacion[] = [];

  editForm = this.fb.group({
    id: [],
    cobranzaOperacion: [null, [Validators.required, Validators.min(0)]],
    estadoCobranzaOperacion: [null, Validators.required],
    operacion: [null, Validators.required],
  });

  constructor(
    protected cobranzaOperacionService: CobranzaOperacionService,
    protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
    protected operacionService: OperacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cobranzaOperacion }) => {
      this.updateForm(cobranzaOperacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cobranzaOperacion = this.createFromForm();
    if (cobranzaOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.cobranzaOperacionService.update(cobranzaOperacion));
    } else {
      this.subscribeToSaveResponse(this.cobranzaOperacionService.create(cobranzaOperacion));
    }
  }

  trackEstadoCobranzaOperacionById(index: number, item: IEstadoCobranzaOperacion): number {
    return item.id!;
  }

  trackOperacionById(index: number, item: IOperacion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaOperacion>>): void {
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

  protected updateForm(cobranzaOperacion: ICobranzaOperacion): void {
    this.editForm.patchValue({
      id: cobranzaOperacion.id,
      cobranzaOperacion: cobranzaOperacion.cobranzaOperacion,
      estadoCobranzaOperacion: cobranzaOperacion.estadoCobranzaOperacion,
      operacion: cobranzaOperacion.operacion,
    });

    this.estadoCobranzaOperacionsSharedCollection = this.estadoCobranzaOperacionService.addEstadoCobranzaOperacionToCollectionIfMissing(
      this.estadoCobranzaOperacionsSharedCollection,
      cobranzaOperacion.estadoCobranzaOperacion
    );
    this.operacionsSharedCollection = this.operacionService.addOperacionToCollectionIfMissing(
      this.operacionsSharedCollection,
      cobranzaOperacion.operacion
    );
  }

  protected loadRelationshipsOptions(): void {
    this.estadoCobranzaOperacionService
      .query()
      .pipe(map((res: HttpResponse<IEstadoCobranzaOperacion[]>) => res.body ?? []))
      .pipe(
        map((estadoCobranzaOperacions: IEstadoCobranzaOperacion[]) =>
          this.estadoCobranzaOperacionService.addEstadoCobranzaOperacionToCollectionIfMissing(
            estadoCobranzaOperacions,
            this.editForm.get('estadoCobranzaOperacion')!.value
          )
        )
      )
      .subscribe(
        (estadoCobranzaOperacions: IEstadoCobranzaOperacion[]) => (this.estadoCobranzaOperacionsSharedCollection = estadoCobranzaOperacions)
      );

    this.operacionService
      .query()
      .pipe(map((res: HttpResponse<IOperacion[]>) => res.body ?? []))
      .pipe(
        map((operacions: IOperacion[]) =>
          this.operacionService.addOperacionToCollectionIfMissing(operacions, this.editForm.get('operacion')!.value)
        )
      )
      .subscribe((operacions: IOperacion[]) => (this.operacionsSharedCollection = operacions));
  }

  protected createFromForm(): ICobranzaOperacion {
    return {
      ...new CobranzaOperacion(),
      id: this.editForm.get(['id'])!.value,
      cobranzaOperacion: this.editForm.get(['cobranzaOperacion'])!.value,
      estadoCobranzaOperacion: this.editForm.get(['estadoCobranzaOperacion'])!.value,
      operacion: this.editForm.get(['operacion'])!.value,
    };
  }
}
