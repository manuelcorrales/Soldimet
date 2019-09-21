import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMotor, Motor } from 'app/shared/model/motor.model';
import { MotorService } from './motor.service';

@Component({
  selector: 'jhi-motor-update',
  templateUrl: './motor-update.component.html'
})
export class MotorUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    marcaMotor: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]]
  });

  constructor(protected motorService: MotorService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ motor }) => {
      this.updateForm(motor);
    });
  }

  updateForm(motor: IMotor) {
    this.editForm.patchValue({
      id: motor.id,
      marcaMotor: motor.marcaMotor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const motor = this.createFromForm();
    if (motor.id !== undefined) {
      this.subscribeToSaveResponse(this.motorService.update(motor));
    } else {
      this.subscribeToSaveResponse(this.motorService.create(motor));
    }
  }

  private createFromForm(): IMotor {
    return {
      ...new Motor(),
      id: this.editForm.get(['id']).value,
      marcaMotor: this.editForm.get(['marcaMotor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotor>>) {
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
