import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICobranzaOperacion, CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';
import { CobranzaOperacionService } from './cobranza-operacion.service';
import { IEstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from 'app/entities/estado-cobranza-operacion/estado-cobranza-operacion.service';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from 'app/entities/operacion/operacion.service';

@Component({
  selector: 'jhi-cobranza-operacion-update',
  templateUrl: './cobranza-operacion-update.component.html'
})
export class CobranzaOperacionUpdateComponent implements OnInit {
  isSaving: boolean;

  estadocobranzaoperacions: IEstadoCobranzaOperacion[];

  operacions: IOperacion[];

  editForm = this.fb.group({
    id: [],
    cobranzaOperacion: [null, [Validators.required, Validators.min(0)]],
    estadoCobranzaOperacion: [null, Validators.required],
    operacion: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cobranzaOperacionService: CobranzaOperacionService,
    protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
    protected operacionService: OperacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cobranzaOperacion }) => {
      this.updateForm(cobranzaOperacion);
    });
    this.estadoCobranzaOperacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoCobranzaOperacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoCobranzaOperacion[]>) => response.body)
      )
      .subscribe(
        (res: IEstadoCobranzaOperacion[]) => (this.estadocobranzaoperacions = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.operacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOperacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOperacion[]>) => response.body)
      )
      .subscribe((res: IOperacion[]) => (this.operacions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cobranzaOperacion: ICobranzaOperacion) {
    this.editForm.patchValue({
      id: cobranzaOperacion.id,
      cobranzaOperacion: cobranzaOperacion.cobranzaOperacion,
      estadoCobranzaOperacion: cobranzaOperacion.estadoCobranzaOperacion,
      operacion: cobranzaOperacion.operacion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cobranzaOperacion = this.createFromForm();
    if (cobranzaOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.cobranzaOperacionService.update(cobranzaOperacion));
    } else {
      this.subscribeToSaveResponse(this.cobranzaOperacionService.create(cobranzaOperacion));
    }
  }

  private createFromForm(): ICobranzaOperacion {
    return {
      ...new CobranzaOperacion(),
      id: this.editForm.get(['id']).value,
      cobranzaOperacion: this.editForm.get(['cobranzaOperacion']).value,
      estadoCobranzaOperacion: this.editForm.get(['estadoCobranzaOperacion']).value,
      operacion: this.editForm.get(['operacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaOperacion>>) {
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

  trackEstadoCobranzaOperacionById(index: number, item: IEstadoCobranzaOperacion) {
    return item.id;
  }

  trackOperacionById(index: number, item: IOperacion) {
    return item.id;
  }
}
