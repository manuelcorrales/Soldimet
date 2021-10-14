import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICostoOperacion, CostoOperacion } from '../costo-operacion.model';
import { CostoOperacionService } from '../service/costo-operacion.service';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/service/cilindrada.service';
import { IOperacion } from 'app/entities/operacion/operacion.model';
import { OperacionService } from 'app/entities/operacion/service/operacion.service';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';

@Component({
  selector: 'jhi-costo-operacion-update',
  templateUrl: './costo-operacion-update.component.html',
})
export class CostoOperacionUpdateComponent implements OnInit {
  isSaving = false;

  cilindradasSharedCollection: ICilindrada[] = [];
  operacionsSharedCollection: IOperacion[] = [];
  tipoParteMotorsSharedCollection: ITipoParteMotor[] = [];

  editForm = this.fb.group({
    id: [],
    costoOperacion: [null, [Validators.required, Validators.min(0)]],
    cilindrada: [null, Validators.required],
    operacion: [null, Validators.required],
    tipoParteMotor: [null, Validators.required],
  });

  constructor(
    protected costoOperacionService: CostoOperacionService,
    protected cilindradaService: CilindradaService,
    protected operacionService: OperacionService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ costoOperacion }) => {
      this.updateForm(costoOperacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const costoOperacion = this.createFromForm();
    if (costoOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.costoOperacionService.update(costoOperacion));
    } else {
      this.subscribeToSaveResponse(this.costoOperacionService.create(costoOperacion));
    }
  }

  trackCilindradaById(index: number, item: ICilindrada): number {
    return item.id!;
  }

  trackOperacionById(index: number, item: IOperacion): number {
    return item.id!;
  }

  trackTipoParteMotorById(index: number, item: ITipoParteMotor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoOperacion>>): void {
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

  protected updateForm(costoOperacion: ICostoOperacion): void {
    this.editForm.patchValue({
      id: costoOperacion.id,
      costoOperacion: costoOperacion.costoOperacion,
      cilindrada: costoOperacion.cilindrada,
      operacion: costoOperacion.operacion,
      tipoParteMotor: costoOperacion.tipoParteMotor,
    });

    this.cilindradasSharedCollection = this.cilindradaService.addCilindradaToCollectionIfMissing(
      this.cilindradasSharedCollection,
      costoOperacion.cilindrada
    );
    this.operacionsSharedCollection = this.operacionService.addOperacionToCollectionIfMissing(
      this.operacionsSharedCollection,
      costoOperacion.operacion
    );
    this.tipoParteMotorsSharedCollection = this.tipoParteMotorService.addTipoParteMotorToCollectionIfMissing(
      this.tipoParteMotorsSharedCollection,
      costoOperacion.tipoParteMotor
    );
  }

  protected loadRelationshipsOptions(): void {
    this.cilindradaService
      .query()
      .pipe(map((res: HttpResponse<ICilindrada[]>) => res.body ?? []))
      .pipe(
        map((cilindradas: ICilindrada[]) =>
          this.cilindradaService.addCilindradaToCollectionIfMissing(cilindradas, this.editForm.get('cilindrada')!.value)
        )
      )
      .subscribe((cilindradas: ICilindrada[]) => (this.cilindradasSharedCollection = cilindradas));

    this.operacionService
      .query()
      .pipe(map((res: HttpResponse<IOperacion[]>) => res.body ?? []))
      .pipe(
        map((operacions: IOperacion[]) =>
          this.operacionService.addOperacionToCollectionIfMissing(operacions, this.editForm.get('operacion')!.value)
        )
      )
      .subscribe((operacions: IOperacion[]) => (this.operacionsSharedCollection = operacions));

    this.tipoParteMotorService
      .query()
      .pipe(map((res: HttpResponse<ITipoParteMotor[]>) => res.body ?? []))
      .pipe(
        map((tipoParteMotors: ITipoParteMotor[]) =>
          this.tipoParteMotorService.addTipoParteMotorToCollectionIfMissing(tipoParteMotors, this.editForm.get('tipoParteMotor')!.value)
        )
      )
      .subscribe((tipoParteMotors: ITipoParteMotor[]) => (this.tipoParteMotorsSharedCollection = tipoParteMotors));
  }

  protected createFromForm(): ICostoOperacion {
    return {
      ...new CostoOperacion(),
      id: this.editForm.get(['id'])!.value,
      costoOperacion: this.editForm.get(['costoOperacion'])!.value,
      cilindrada: this.editForm.get(['cilindrada'])!.value,
      operacion: this.editForm.get(['operacion'])!.value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor'])!.value,
    };
  }
}
