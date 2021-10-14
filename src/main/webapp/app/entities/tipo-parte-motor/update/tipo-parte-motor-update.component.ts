import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ITipoParteMotor, TipoParteMotor } from '../tipo-parte-motor.model';
import { TipoParteMotorService } from '../service/tipo-parte-motor.service';

@Component({
  selector: 'jhi-tipo-parte-motor-update',
  templateUrl: './tipo-parte-motor-update.component.html',
})
export class TipoParteMotorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreTipoParteMotor: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
      this.updateForm(tipoParteMotor);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const tipoParteMotor = this.createFromForm();
    if (tipoParteMotor.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoParteMotorService.update(tipoParteMotor));
    } else {
      this.subscribeToSaveResponse(this.tipoParteMotorService.create(tipoParteMotor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoParteMotor>>): void {
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

  protected updateForm(tipoParteMotor: ITipoParteMotor): void {
    this.editForm.patchValue({
      id: tipoParteMotor.id,
      nombreTipoParteMotor: tipoParteMotor.nombreTipoParteMotor,
    });
  }

  protected createFromForm(): ITipoParteMotor {
    return {
      ...new TipoParteMotor(),
      id: this.editForm.get(['id'])!.value,
      nombreTipoParteMotor: this.editForm.get(['nombreTipoParteMotor'])!.value,
    };
  }
}
