import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IOperacion, Operacion } from '../operacion.model';
import { OperacionService } from '../service/operacion.service';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';
import { IEstadoOperacion } from 'app/entities/estado-operacion/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/service/estado-operacion.service';

@Component({
  selector: 'jhi-operacion-update',
  templateUrl: './operacion-update.component.html',
})
export class OperacionUpdateComponent implements OnInit {
  isSaving = false;

  tipoParteMotorsSharedCollection: ITipoParteMotor[] = [];
  estadoOperacionsSharedCollection: IEstadoOperacion[] = [];

  editForm = this.fb.group({
    id: [],
    nombreOperacion: [null, [Validators.required]],
    tipoParteMotor: [null, Validators.required],
    estadoOperacion: [null, Validators.required],
  });

  constructor(
    protected operacionService: OperacionService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected estadoOperacionService: EstadoOperacionService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ operacion }) => {
      this.updateForm(operacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const operacion = this.createFromForm();
    if (operacion.id !== undefined) {
      this.subscribeToSaveResponse(this.operacionService.update(operacion));
    } else {
      this.subscribeToSaveResponse(this.operacionService.create(operacion));
    }
  }

  trackTipoParteMotorById(index: number, item: ITipoParteMotor): number {
    return item.id!;
  }

  trackEstadoOperacionById(index: number, item: IEstadoOperacion): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperacion>>): void {
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

  protected updateForm(operacion: IOperacion): void {
    this.editForm.patchValue({
      id: operacion.id,
      nombreOperacion: operacion.nombreOperacion,
      tipoParteMotor: operacion.tipoParteMotor,
      estadoOperacion: operacion.estadoOperacion,
    });

    this.tipoParteMotorsSharedCollection = this.tipoParteMotorService.addTipoParteMotorToCollectionIfMissing(
      this.tipoParteMotorsSharedCollection,
      operacion.tipoParteMotor
    );
    this.estadoOperacionsSharedCollection = this.estadoOperacionService.addEstadoOperacionToCollectionIfMissing(
      this.estadoOperacionsSharedCollection,
      operacion.estadoOperacion
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoParteMotorService
      .query()
      .pipe(map((res: HttpResponse<ITipoParteMotor[]>) => res.body ?? []))
      .pipe(
        map((tipoParteMotors: ITipoParteMotor[]) =>
          this.tipoParteMotorService.addTipoParteMotorToCollectionIfMissing(tipoParteMotors, this.editForm.get('tipoParteMotor')!.value)
        )
      )
      .subscribe((tipoParteMotors: ITipoParteMotor[]) => (this.tipoParteMotorsSharedCollection = tipoParteMotors));

    this.estadoOperacionService
      .query()
      .pipe(map((res: HttpResponse<IEstadoOperacion[]>) => res.body ?? []))
      .pipe(
        map((estadoOperacions: IEstadoOperacion[]) =>
          this.estadoOperacionService.addEstadoOperacionToCollectionIfMissing(estadoOperacions, this.editForm.get('estadoOperacion')!.value)
        )
      )
      .subscribe((estadoOperacions: IEstadoOperacion[]) => (this.estadoOperacionsSharedCollection = estadoOperacions));
  }

  protected createFromForm(): IOperacion {
    return {
      ...new Operacion(),
      id: this.editForm.get(['id'])!.value,
      nombreOperacion: this.editForm.get(['nombreOperacion'])!.value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor'])!.value,
      estadoOperacion: this.editForm.get(['estadoOperacion'])!.value,
    };
  }
}
