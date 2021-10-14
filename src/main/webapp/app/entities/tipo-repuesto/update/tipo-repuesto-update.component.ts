import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ITipoRepuesto, TipoRepuesto } from '../tipo-repuesto.model';
import { TipoRepuestoService } from '../service/tipo-repuesto.service';
import { ITipoParteMotor } from 'app/entities/tipo-parte-motor/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/service/tipo-parte-motor.service';

@Component({
  selector: 'jhi-tipo-repuesto-update',
  templateUrl: './tipo-repuesto-update.component.html',
})
export class TipoRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  tipoParteMotorsSharedCollection: ITipoParteMotor[] = [];

  editForm = this.fb.group({
    id: [],
    nombreTipoRepuesto: [null, [Validators.required, Validators.minLength(3)]],
    tipoParteMotor: [null, Validators.required],
  });

  constructor(
    protected tipoRepuestoService: TipoRepuestoService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoRepuesto }) => {
      this.updateForm(tipoRepuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoRepuesto = this.createFromForm();
    if (tipoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoRepuestoService.update(tipoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.tipoRepuestoService.create(tipoRepuesto));
    }
  }

  trackTipoParteMotorById(index: number, item: ITipoParteMotor): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRepuesto>>): void {
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

  protected updateForm(tipoRepuesto: ITipoRepuesto): void {
    this.editForm.patchValue({
      id: tipoRepuesto.id,
      nombreTipoRepuesto: tipoRepuesto.nombreTipoRepuesto,
      tipoParteMotor: tipoRepuesto.tipoParteMotor,
    });

    this.tipoParteMotorsSharedCollection = this.tipoParteMotorService.addTipoParteMotorToCollectionIfMissing(
      this.tipoParteMotorsSharedCollection,
      tipoRepuesto.tipoParteMotor
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
  }

  protected createFromForm(): ITipoRepuesto {
    return {
      ...new TipoRepuesto(),
      id: this.editForm.get(['id'])!.value,
      nombreTipoRepuesto: this.editForm.get(['nombreTipoRepuesto'])!.value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor'])!.value,
    };
  }
}
