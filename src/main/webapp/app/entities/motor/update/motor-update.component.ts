import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMotor, Motor } from '../motor.model';
import { MotorService } from '../service/motor.service';

@Component({
  selector: 'jhi-motor-update',
  templateUrl: './motor-update.component.html',
})
export class MotorUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    marcaMotor: [null, [Validators.required, Validators.minLength(2), Validators.maxLength(25)]],
  });

  constructor(protected motorService: MotorService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ motor }) => {
      this.updateForm(motor);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const motor = this.createFromForm();
    if (motor.id !== undefined) {
      this.subscribeToSaveResponse(this.motorService.update(motor));
    } else {
      this.subscribeToSaveResponse(this.motorService.create(motor));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMotor>>): void {
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

  protected updateForm(motor: IMotor): void {
    this.editForm.patchValue({
      id: motor.id,
      marcaMotor: motor.marcaMotor,
    });
  }

  protected createFromForm(): IMotor {
    return {
      ...new Motor(),
      id: this.editForm.get(['id'])!.value,
      marcaMotor: this.editForm.get(['marcaMotor'])!.value,
    };
  }
}
