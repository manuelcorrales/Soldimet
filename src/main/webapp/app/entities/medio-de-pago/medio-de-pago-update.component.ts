import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedioDePago, MedioDePago } from 'app/shared/model/medio-de-pago.model';
import { MedioDePagoService } from 'app/entities/medio-de-pago/medio-de-pago.service';
import { IFormaDePago } from 'app/shared/model/forma-de-pago.model';
import { FormaDePagoService } from 'app/entities/forma-de-pago/forma-de-pago.service';
import { IMedioDePagoCheque } from 'app/shared/model/medio-de-pago-cheque.model';
import { MedioDePagoChequeService } from 'app/entities/medio-de-pago-cheque/medio-de-pago-cheque.service';

@Component({
  selector: 'jhi-medio-de-pago-update',
  templateUrl: './medio-de-pago-update.component.html'
})
export class MedioDePagoUpdateComponent implements OnInit {
  isSaving: boolean;

  formadepagos: IFormaDePago[];

  mediodepagocheques: IMedioDePagoCheque[];

  editForm = this.fb.group({
    id: [],
    formaDePago: [null, Validators.required],
    medioDePagoCheque: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected medioDePagoService: MedioDePagoService,
    protected formaDePagoService: FormaDePagoService,
    protected medioDePagoChequeService: MedioDePagoChequeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ medioDePago }) => {
      this.updateForm(medioDePago);
    });
    this.formaDePagoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IFormaDePago[]>) => mayBeOk.ok),
        map((response: HttpResponse<IFormaDePago[]>) => response.body)
      )
      .subscribe((res: IFormaDePago[]) => (this.formadepagos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.medioDePagoChequeService
      .query({ filter: 'mediodepago-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMedioDePagoCheque[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedioDePagoCheque[]>) => response.body)
      )
      .subscribe(
        (res: IMedioDePagoCheque[]) => {
          if (!this.editForm.get('medioDePagoCheque').value || !this.editForm.get('medioDePagoCheque').value.id) {
            this.mediodepagocheques = res;
          } else {
            this.medioDePagoChequeService
              .find(this.editForm.get('medioDePagoCheque').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMedioDePagoCheque>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMedioDePagoCheque>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMedioDePagoCheque) => (this.mediodepagocheques = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(medioDePago: IMedioDePago) {
    this.editForm.patchValue({
      id: medioDePago.id,
      formaDePago: medioDePago.formaDePago,
      medioDePagoCheque: medioDePago.medioDePagoCheque
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const medioDePago = this.createFromForm();
    if (medioDePago.id !== undefined) {
      this.subscribeToSaveResponse(this.medioDePagoService.update(medioDePago));
    } else {
      this.subscribeToSaveResponse(this.medioDePagoService.create(medioDePago));
    }
  }

  private createFromForm(): IMedioDePago {
    return {
      ...new MedioDePago(),
      id: this.editForm.get(['id']).value,
      formaDePago: this.editForm.get(['formaDePago']).value,
      medioDePagoCheque: this.editForm.get(['medioDePagoCheque']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePago>>) {
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

  trackMedioDePagoChequeById(index: number, item: IMedioDePagoCheque) {
    return item.id;
  }
}
