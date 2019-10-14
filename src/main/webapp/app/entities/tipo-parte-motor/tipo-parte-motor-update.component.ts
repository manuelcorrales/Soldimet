import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ITipoParteMotor, TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from './tipo-parte-motor.service';

@Component({
  selector: 'jhi-tipo-parte-motor-update',
  templateUrl: './tipo-parte-motor-update.component.html'
})
export class TipoParteMotorUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreTipoParteMotor: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected tipoParteMotorService: TipoParteMotorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoParteMotor }) => {
      this.updateForm(tipoParteMotor);
    });
  }

  updateForm(tipoParteMotor: ITipoParteMotor) {
    this.editForm.patchValue({
      id: tipoParteMotor.id,
      nombreTipoParteMotor: tipoParteMotor.nombreTipoParteMotor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoParteMotor = this.createFromForm();
    if (tipoParteMotor.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoParteMotorService.update(tipoParteMotor));
    } else {
      this.subscribeToSaveResponse(this.tipoParteMotorService.create(tipoParteMotor));
    }
  }

  private createFromForm(): ITipoParteMotor {
    return {
      ...new TipoParteMotor(),
      id: this.editForm.get(['id']).value,
      nombreTipoParteMotor: this.editForm.get(['nombreTipoParteMotor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoParteMotor>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
