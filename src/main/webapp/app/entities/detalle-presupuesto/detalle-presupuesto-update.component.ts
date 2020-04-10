import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetallePresupuesto, DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';
import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { IMotor } from 'app/shared/model/motor.model';
import { MotorService } from 'app/entities/motor/motor.service';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

@Component({
  selector: 'jhi-detalle-presupuesto-update',
  templateUrl: './detalle-presupuesto-update.component.html'
})
export class DetallePresupuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  aplicacions: IAplicacion[];

  cilindradas: ICilindrada[];

  motors: IMotor[];

  tipopartemotors: ITipoParteMotor[];

  editForm = this.fb.group({
    id: [],
    importe: [null, [Validators.required, Validators.min(0)]],
    aplicacion: [null, Validators.required],
    cilindrada: [null, Validators.required],
    motor: [null, Validators.required],
    tipoParteMotor: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detallePresupuestoService: DetallePresupuestoService,
    protected aplicacionService: AplicacionService,
    protected cilindradaService: CilindradaService,
    protected motorService: MotorService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detallePresupuesto }) => {
      this.updateForm(detallePresupuesto);
    });
    this.aplicacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAplicacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAplicacion[]>) => response.body)
      )
      .subscribe((res: IAplicacion[]) => (this.aplicacions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cilindradaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICilindrada[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICilindrada[]>) => response.body)
      )
      .subscribe((res: ICilindrada[]) => (this.cilindradas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.motorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMotor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMotor[]>) => response.body)
      )
      .subscribe((res: IMotor[]) => (this.motors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoParteMotorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoParteMotor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoParteMotor[]>) => response.body)
      )
      .subscribe((res: ITipoParteMotor[]) => (this.tipopartemotors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(detallePresupuesto: IDetallePresupuesto) {
    this.editForm.patchValue({
      id: detallePresupuesto.id,
      importe: detallePresupuesto.importe,
      aplicacion: detallePresupuesto.aplicacion,
      cilindrada: detallePresupuesto.cilindrada,
      motor: detallePresupuesto.motor,
      tipoParteMotor: detallePresupuesto.tipoParteMotor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detallePresupuesto = this.createFromForm();
    if (detallePresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.detallePresupuestoService.update(detallePresupuesto));
    } else {
      this.subscribeToSaveResponse(this.detallePresupuestoService.create(detallePresupuesto));
    }
  }

  private createFromForm(): IDetallePresupuesto {
    return {
      ...new DetallePresupuesto(),
      id: this.editForm.get(['id']).value,
      importe: this.editForm.get(['importe']).value,
      aplicacion: this.editForm.get(['aplicacion']).value,
      cilindrada: this.editForm.get(['cilindrada']).value,
      motor: this.editForm.get(['motor']).value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePresupuesto>>) {
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

  trackAplicacionById(index: number, item: IAplicacion) {
    return item.id;
  }

  trackCilindradaById(index: number, item: ICilindrada) {
    return item.id;
  }

  trackMotorById(index: number, item: IMotor) {
    return item.id;
  }

  trackTipoParteMotorById(index: number, item: ITipoParteMotor) {
    return item.id;
  }
}
