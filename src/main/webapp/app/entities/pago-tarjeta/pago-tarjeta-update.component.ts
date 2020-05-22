import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPagoTarjeta, PagoTarjeta } from 'app/shared/model/pago-tarjeta.model';
import { PagoTarjetaService } from 'app/entities/pago-tarjeta/pago-tarjeta.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';

@Component({
  selector: 'jhi-pago-tarjeta-update',
  templateUrl: './pago-tarjeta-update.component.html'
})
export class PagoTarjetaUpdateComponent implements OnInit {
  isSaving: boolean;

  formadepagos: IFormaDePago[];

  editForm = this.fb.group({
    id: [],
    formaDePago: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pagoTarjetaService: PagoTarjetaService,
    protected formaDePagoService: FormaDePagoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pagoTarjeta }) => {
      this.updateForm(pagoTarjeta);
    });
    this.formaDePagoService
      .query({ filter: 'pagotarjeta-is-null' })
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

  updateForm(pagoTarjeta: IPagoTarjeta) {
    this.editForm.patchValue({
      id: pagoTarjeta.id,
      formaDePago: pagoTarjeta.formaDePago
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pagoTarjeta = this.createFromForm();
    if (pagoTarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.pagoTarjetaService.update(pagoTarjeta));
    } else {
      this.subscribeToSaveResponse(this.pagoTarjetaService.create(pagoTarjeta));
    }
  }

  private createFromForm(): IPagoTarjeta {
    return {
      ...new PagoTarjeta(),
      id: this.editForm.get(['id']).value,
      formaDePago: this.editForm.get(['formaDePago']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPagoTarjeta>>) {
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
