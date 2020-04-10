import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IAplicacion, Aplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';
import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor/motor.service';

@Component({
  selector: 'jhi-aplicacion-update',
  templateUrl: './aplicacion-update.component.html'
})
export class AplicacionUpdateComponent implements OnInit {
  isSaving: boolean;

  motors: IMotor[];

  editForm = this.fb.group({
    id: [],
    nombreAplicacion: [null, [Validators.required]],
    numeroGrupo: [null, [Validators.required, Validators.min(1), Validators.max(100)]],
    motor: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected aplicacionService: AplicacionService,
    protected motorService: MotorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ aplicacion }) => {
      this.updateForm(aplicacion);
    });
    this.motorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMotor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMotor[]>) => response.body)
      )
      .subscribe((res: IMotor[]) => (this.motors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(aplicacion: IAplicacion) {
    this.editForm.patchValue({
      id: aplicacion.id,
      nombreAplicacion: aplicacion.nombreAplicacion,
      numeroGrupo: aplicacion.numeroGrupo,
      motor: aplicacion.motor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const aplicacion = this.createFromForm();
    if (aplicacion.id !== undefined) {
      this.subscribeToSaveResponse(this.aplicacionService.update(aplicacion));
    } else {
      this.subscribeToSaveResponse(this.aplicacionService.create(aplicacion));
    }
  }

  private createFromForm(): IAplicacion {
    return {
      ...new Aplicacion(),
      id: this.editForm.get(['id']).value,
      nombreAplicacion: this.editForm.get(['nombreAplicacion']).value,
      numeroGrupo: this.editForm.get(['numeroGrupo']).value,
      motor: this.editForm.get(['motor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IAplicacion>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMotorById(index: number, item: IMotor) {
    return item.id;
  }
}
