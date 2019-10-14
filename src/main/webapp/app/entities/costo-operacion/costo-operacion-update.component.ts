import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICostoOperacion, CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from './costo-operacion.service';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion/operacion.service';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

@Component({
  selector: 'jhi-costo-operacion-update',
  templateUrl: './costo-operacion-update.component.html'
})
export class CostoOperacionUpdateComponent implements OnInit {
  isSaving: boolean;

  cilindradas: ICilindrada[];

  operacions: IOperacion[];

  tipopartemotors: ITipoParteMotor[];

  editForm = this.fb.group({
    id: [],
    costoOperacion: [null, [Validators.required, Validators.min(0)]],
    cilindrada: [null, Validators.required],
    operacion: [null, Validators.required],
    tipoParteMotor: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected costoOperacionService: CostoOperacionService,
    protected cilindradaService: CilindradaService,
    protected operacionService: OperacionService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ costoOperacion }) => {
      this.updateForm(costoOperacion);
    });
    this.cilindradaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICilindrada[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICilindrada[]>) => response.body)
      )
      .subscribe((res: ICilindrada[]) => (this.cilindradas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.operacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOperacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOperacion[]>) => response.body)
      )
      .subscribe((res: IOperacion[]) => (this.operacions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoParteMotorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoParteMotor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoParteMotor[]>) => response.body)
      )
      .subscribe((res: ITipoParteMotor[]) => (this.tipopartemotors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(costoOperacion: ICostoOperacion) {
    this.editForm.patchValue({
      id: costoOperacion.id,
      costoOperacion: costoOperacion.costoOperacion,
      cilindrada: costoOperacion.cilindrada,
      operacion: costoOperacion.operacion,
      tipoParteMotor: costoOperacion.tipoParteMotor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const costoOperacion = this.createFromForm();
    if (costoOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.costoOperacionService.update(costoOperacion));
    } else {
      this.subscribeToSaveResponse(this.costoOperacionService.create(costoOperacion));
    }
  }

  private createFromForm(): ICostoOperacion {
    return {
      ...new CostoOperacion(),
      id: this.editForm.get(['id']).value,
      costoOperacion: this.editForm.get(['costoOperacion']).value,
      cilindrada: this.editForm.get(['cilindrada']).value,
      operacion: this.editForm.get(['operacion']).value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoOperacion>>) {
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

  trackCilindradaById(index: number, item: ICilindrada) {
    return item.id;
  }

  trackOperacionById(index: number, item: IOperacion) {
    return item.id;
  }

  trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
    return item.id;
  }
}
