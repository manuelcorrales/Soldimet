import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IHistorialPrecio, HistorialPrecio } from 'app/shared/model/historial-precio.model';
import { HistorialPrecioService } from './historial-precio.service';
import { IPrecioRepuesto } from 'app/shared/model/precio-repuesto.model';
import { PrecioRepuestoService } from 'app/entities/precio-repuesto/precio-repuesto.service';

@Component({
  selector: 'jhi-historial-precio-update',
  templateUrl: './historial-precio-update.component.html'
})
export class HistorialPrecioUpdateComponent implements OnInit {
  isSaving: boolean;

  preciorepuestos: IPrecioRepuesto[];
  fechaHistorialDp: any;

  editForm = this.fb.group({
    id: [],
    fechaHistorial: [null, [Validators.required]],
    precioRepuesto: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected historialPrecioService: HistorialPrecioService,
    protected precioRepuestoService: PrecioRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ historialPrecio }) => {
      this.updateForm(historialPrecio);
    });
    this.precioRepuestoService
      .query({ filter: 'historialprecio-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPrecioRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPrecioRepuesto[]>) => response.body)
      )
      .subscribe(
        (res: IPrecioRepuesto[]) => {
          if (!this.editForm.get('precioRepuesto').value || !this.editForm.get('precioRepuesto').value.id) {
            this.preciorepuestos = res;
          } else {
            this.precioRepuestoService
              .find(this.editForm.get('precioRepuesto').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPrecioRepuesto>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPrecioRepuesto>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPrecioRepuesto) => (this.preciorepuestos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(historialPrecio: IHistorialPrecio) {
    this.editForm.patchValue({
      id: historialPrecio.id,
      fechaHistorial: historialPrecio.fechaHistorial,
      precioRepuesto: historialPrecio.precioRepuesto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const historialPrecio = this.createFromForm();
    if (historialPrecio.id !== undefined) {
      this.subscribeToSaveResponse(this.historialPrecioService.update(historialPrecio));
    } else {
      this.subscribeToSaveResponse(this.historialPrecioService.create(historialPrecio));
    }
  }

  private createFromForm(): IHistorialPrecio {
    return {
      ...new HistorialPrecio(),
      id: this.editForm.get(['id']).value,
      fechaHistorial: this.editForm.get(['fechaHistorial']).value,
      precioRepuesto: this.editForm.get(['precioRepuesto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IHistorialPrecio>>) {
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

  trackPrecioRepuestoById(index: number, item: IPrecioRepuesto) {
    return item.id;
  }
}
