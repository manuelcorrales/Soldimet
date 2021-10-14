import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IAplicacion, Aplicacion } from '../aplicacion.model';
import { AplicacionService } from '../service/aplicacion.service';
import { IMotor } from 'app/entities/motor/motor.model';
import { MotorService } from 'app/entities/motor/service/motor.service';

@Component({
  selector: 'jhi-aplicacion-update',
  templateUrl: './aplicacion-update.component.html',
})
export class AplicacionUpdateComponent implements OnInit {
  isSaving = false;

  motorsSharedCollection: IMotor[] = [];

  editForm = this.fb.group({
    id: [],
    nombreAplicacion: [null, [Validators.required]],
    numeroGrupo: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    motor: [null, Validators.required],
  });

  constructor(
    protected aplicacionService: AplicacionService,
    protected motorService: MotorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ aplicacion }) => {
      this.updateForm(aplicacion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const aplicacion = this.createFromForm();
    if (aplicacion.id !== undefined) {
      this.subscribeToSaveResponse(this.aplicacionService.update(aplicacion));
    } else {
      this.subscribeToSaveResponse(this.aplicacionService.create(aplicacion));
    }
  }

  trackMotorById(index: number, item: IMotor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAplicacion>>): void {
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

  protected updateForm(aplicacion: IAplicacion): void {
    this.editForm.patchValue({
      id: aplicacion.id,
      nombreAplicacion: aplicacion.nombreAplicacion,
      numeroGrupo: aplicacion.numeroGrupo,
      motor: aplicacion.motor,
    });

    this.motorsSharedCollection = this.motorService.addMotorToCollectionIfMissing(this.motorsSharedCollection, aplicacion.motor);
  }

  protected loadRelationshipsOptions(): void {
    this.motorService
      .query()
      .pipe(map((res: HttpResponse<IMotor[]>) => res.body ?? []))
      .pipe(map((motors: IMotor[]) => this.motorService.addMotorToCollectionIfMissing(motors, this.editForm.get('motor')!.value)))
      .subscribe((motors: IMotor[]) => (this.motorsSharedCollection = motors));
  }

  protected createFromForm(): IAplicacion {
    return {
      ...new Aplicacion(),
      id: this.editForm.get(['id'])!.value,
      nombreAplicacion: this.editForm.get(['nombreAplicacion'])!.value,
      numeroGrupo: this.editForm.get(['numeroGrupo'])!.value,
      motor: this.editForm.get(['motor'])!.value,
    };
  }
}
