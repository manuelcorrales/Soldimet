import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOperacion, Operacion } from 'app/shared/model/operacion.model';
import { OperacionService } from './operacion.service';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';
import { IEstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';

@Component({
  selector: 'jhi-operacion-update',
  templateUrl: './operacion-update.component.html'
})
export class OperacionUpdateComponent implements OnInit {
  isSaving: boolean;

  tipopartemotors: ITipoParteMotor[];

  estadooperacions: IEstadoOperacion[];

  editForm = this.fb.group({
    id: [],
    nombreOperacion: [null, [Validators.required]],
    tipoParteMotor: [null, Validators.required],
    estadoOperacion: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected operacionService: OperacionService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected estadoOperacionService: EstadoOperacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ operacion }) => {
      this.updateForm(operacion);
    });
    this.tipoParteMotorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoParteMotor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoParteMotor[]>) => response.body)
      )
      .subscribe((res: ITipoParteMotor[]) => (this.tipopartemotors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.estadoOperacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoOperacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoOperacion[]>) => response.body)
      )
      .subscribe((res: IEstadoOperacion[]) => (this.estadooperacions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(operacion: IOperacion) {
    this.editForm.patchValue({
      id: operacion.id,
      nombreOperacion: operacion.nombreOperacion,
      tipoParteMotor: operacion.tipoParteMotor,
      estadoOperacion: operacion.estadoOperacion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const operacion = this.createFromForm();
    if (operacion.id !== undefined) {
      this.subscribeToSaveResponse(this.operacionService.update(operacion));
    } else {
      this.subscribeToSaveResponse(this.operacionService.create(operacion));
    }
  }

  private createFromForm(): IOperacion {
    return {
      ...new Operacion(),
      id: this.editForm.get(['id']).value,
      nombreOperacion: this.editForm.get(['nombreOperacion']).value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor']).value,
      estadoOperacion: this.editForm.get(['estadoOperacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IOperacion>>) {
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

  trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
    return item.id;
  }

  trackEstadoOperacionById(index: number, item: IEstadoOperacion) {
    return item.id;
  }
}
