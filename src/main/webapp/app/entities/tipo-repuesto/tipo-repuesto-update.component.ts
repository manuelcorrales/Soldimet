import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ITipoRepuesto, TipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from './tipo-repuesto.service';
import { ITipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { TipoParteMotorService } from 'app/entities/tipo-parte-motor/tipo-parte-motor.service';

@Component({
  selector: 'jhi-tipo-repuesto-update',
  templateUrl: './tipo-repuesto-update.component.html'
})
export class TipoRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  tipopartemotors: ITipoParteMotor[];

  editForm = this.fb.group({
    id: [],
    nombreTipoRepuesto: [null, [Validators.required, Validators.minLength(3)]],
    tipoParteMotor: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected tipoParteMotorService: TipoParteMotorService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ tipoRepuesto }) => {
      this.updateForm(tipoRepuesto);
    });
    this.tipoParteMotorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoParteMotor[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoParteMotor[]>) => response.body)
      )
      .subscribe((res: ITipoParteMotor[]) => (this.tipopartemotors = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(tipoRepuesto: ITipoRepuesto) {
    this.editForm.patchValue({
      id: tipoRepuesto.id,
      nombreTipoRepuesto: tipoRepuesto.nombreTipoRepuesto,
      tipoParteMotor: tipoRepuesto.tipoParteMotor
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const tipoRepuesto = this.createFromForm();
    if (tipoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.tipoRepuestoService.update(tipoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.tipoRepuestoService.create(tipoRepuesto));
    }
  }

  private createFromForm(): ITipoRepuesto {
    return {
      ...new TipoRepuesto(),
      id: this.editForm.get(['id']).value,
      nombreTipoRepuesto: this.editForm.get(['nombreTipoRepuesto']).value,
      tipoParteMotor: this.editForm.get(['tipoParteMotor']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ITipoRepuesto>>) {
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
}
