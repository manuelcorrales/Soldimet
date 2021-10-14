import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDetallePresupuesto, DetallePresupuesto } from '../detalle-presupuesto.model';
import { DetallePresupuestoService } from '../service/detalle-presupuesto.service';
import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/service/aplicacion.service';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/service/cilindrada.service';
import { IMotor } from 'app/entities/motor/motor.model';
import { MotorService } from 'app/entities/motor/service/motor.service';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';

@Component({
  selector: 'jhi-detalle-presupuesto-update',
  templateUrl: './detalle-presupuesto-update.component.html',
})
export class DetallePresupuestoUpdateComponent implements OnInit {
  isSaving = false;

  aplicacionsSharedCollection: IAplicacion[] = [];
  cilindradasSharedCollection: ICilindrada[] = [];
  motorsSharedCollection: IMotor[] = [];
  tipoParteMotorsSharedCollection: ITipoParteMotor[] = [];

  editForm = this.fb.group({
    id: [],
    importe: [null, [Validators.required, Validators.min(0)]],
    aplicacion: [null, Validators.required],
    cilindrada: [null, Validators.required],
    motor: [null, Validators.required],
    tipoParteMotor: [null, Validators.required],
  });

  constructor(
    protected detallePresupuestoService: DetallePresupuestoService,
    protected aplicacionService: AplicacionService,
    protected cilindradaService: CilindradaService,
    protected motorService: MotorService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ detallePresupuesto }) => {
      this.updateForm(detallePresupuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const detallePresupuesto = this.createFromForm();
    if (detallePresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.detallePresupuestoService.update(detallePresupuesto));
    } else {
      this.subscribeToSaveResponse(this.detallePresupuestoService.create(detallePresupuesto));
    }
  }

  trackAplicacionById(index: number, item: IAplicacion): number {
    return item.id!;
  }

  trackCilindradaById(index: number, item: ICilindrada): number {
    return item.id!;
  }

  trackMotorById(index: number, item: IMotor): number {
    return item.id!;
  }

  trackTipoParteMotorById(index: number, item: ITipoParteMotor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePresupuesto>>): void {
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

  protected updateForm(detallePresupuesto: IDetallePresupuesto): void {
    this.editForm.patchValue({
      id: detallePresupuesto.id,
      importe: detallePresupuesto.importe,
      aplicacion: detallePresupuesto.aplicacion,
      cilindrada: detallePresupuesto.cilindrada,
      motor: detallePresupuesto.motor,
      tipoParteMotor: detallePresupuesto.tipoParteMotor,
    });

    this.aplicacionsSharedCollection = this.aplicacionService.addAplicacionToCollectionIfMissing(
      this.aplicacionsSharedCollection,
      detallePresupuesto.aplicacion
    );
    this.cilindradasSharedCollection = this.cilindradaService.addCilindradaToCollectionIfMissing(
      this.cilindradasSharedCollection,
      detallePresupuesto.cilindrada
    );
    this.motorsSharedCollection = this.motorService.addMotorToCollectionIfMissing(this.motorsSharedCollection, detallePresupuesto.motor);
    this.tipoParteMotorsSharedCollection = this.tipoParteMotorService.addTipoParteMotorToCollectionIfMissing(
      this.tipoParteMotorsSharedCollection,
      detallePresupuesto.tipoParteMotor
    );
  }

  protected loadRelationshipsOptions(): void {
    this.aplicacionService
      .query()
      .pipe(map((res: HttpResponse<IAplicacion[]>) => res.body ?? []))
      .pipe(
        map((aplicacions: IAplicacion[]) =>
          this.aplicacionService.addAplicacionToCollectionIfMissing(aplicacions, this.editForm.get('aplicacion')!.value)
        )
      )
      .subscribe((aplicacions: IAplicacion[]) => (this.aplicacionsSharedCollection = aplicacions));

    this.cilindradaService
      .query()
      .pipe(map((res: HttpResponse<ICilindrada[]>) => res.body ?? []))
      .pipe(
        map((cilindradas: ICilindrada[]) =>
          this.cilindradaService.addCilindradaToCollectionIfMissing(cilindradas, this.editForm.get('cilindrada')!.value)
        )
      )
      .subscribe((cilindradas: ICilindrada[]) => (this.cilindradasSharedCollection = cilindradas));

    this.motorService
      .query()
      .pipe(map((res: HttpResponse<IMotor[]>) => res.body ?? []))
      .pipe(map((motors: IMotor[]) => this.motorService.addMotorToCollectionIfMissing(motors, this.editForm.get('motor')!.value)))
      .subscribe((motors: IMotor[]) => (this.motorsSharedCollection = motors));

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

  protected createFromForm(): IDetallePresupuesto {
    return {
      ...new DetallePresupuesto(),
      id: this.editForm.get(['id'])!.value,
      importe: this.editForm.get(['importe'])!.value,
      aplicacion: this.editForm.get(['aplicacion'])!.value,
      cilindrada: this.editForm.get(['cilindrada'])!.value,
      motor: this.editForm.get(['motor'])!.value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor'])!.value,
    };
  }
}
