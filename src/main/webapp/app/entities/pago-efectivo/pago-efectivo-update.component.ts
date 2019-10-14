import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPagoEfectivo, PagoEfectivo } from 'app/shared/model/pago-efectivo.model';
import { PagoEfectivoService } from './pago-efectivo.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

@Component({
  selector: 'jhi-pago-efectivo-update',
  templateUrl: './pago-efectivo-update.component.html'
})
export class PagoEfectivoUpdateComponent implements OnInit {
  isSaving: boolean;

  formadepagos: IFormaDePago[];

  editForm = this.fb.group({
    id: [],
    formaDePago: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pagoEfectivoService: PagoEfectivoService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagoEfectivo }) => {
      this.updateForm(pagoEfectivo);
    });
    this.formaDePagoService
      .query({ filter: 'pagoefectivo-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IFormaDePago[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFormaDePago[]>) => response.body)
      )
      .subscribe(
        (res: IFormaDePago[]) => {
          if (!this.editForm.get('formaDePago').value || !this.editForm.get('formaDePago').value.id) {
            this.formadepagos = res;
          } else {
            this.formaDePagoService
              .find(this.editForm.get('formaDePago').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IFormaDePago>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IFormaDePago>) => subResponse.body)
              )
              .subscribe(
                (subRes: IFormaDePago) => (this.formadepagos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(pagoEfectivo: IPagoEfectivo) {
    this.editForm.patchValue({
      id: pagoEfectivo.id,
      formaDePago: pagoEfectivo.formaDePago
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagoEfectivo = this.createFromForm();
    if (pagoEfectivo.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoEfectivoService.update(pagoEfectivo));
    } else {
      this.subscribeToSaveResponse(this.pagoEfectivoService.create(pagoEfectivo));
    }
  }

  private createFromForm(): IPagoEfectivo {
    return {
      ...new PagoEfectivo(),
      id: this.editForm.get(['id']).value,
      formaDePago: this.editForm.get(['formaDePago']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoEfectivo>>) {
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

  trackFormaDePagoById(index: number, item: IFormaDePago) {
    return item.id;
  }
}
