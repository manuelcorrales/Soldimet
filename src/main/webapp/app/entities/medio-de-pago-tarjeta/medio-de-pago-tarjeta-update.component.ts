import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMedioDePagoTarjeta, MedioDePagoTarjeta } from 'app/shared/model/medio-de-pago-tarjeta.model';
import { MedioDePagoTarjetaService } from './medio-de-pago-tarjeta.service';
import { ITarjeta } from 'app/shared/model/tarjeta.model';
import { TarjetaService } from 'app/entities/tarjeta/tarjeta.service';
import { ITipoTarjeta } from 'app/shared/model/tipo-tarjeta.model';
import { TipoTarjetaService } from 'app/entities/tipo-tarjeta/tipo-tarjeta.service';

@Component({
  selector: 'jhi-medio-de-pago-tarjeta-update',
  templateUrl: './medio-de-pago-tarjeta-update.component.html'
})
export class MedioDePagoTarjetaUpdateComponent implements OnInit {
  isSaving: boolean;

  tarjetas: ITarjeta[];

  tipotarjetas: ITipoTarjeta[];

  editForm = this.fb.group({
    id: [],
    ultimos4: [null, [Validators.required, Validators.minLength(4)]],
    tarjeta: [null, Validators.required],
    tipoTarjeta: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected medioDePagoTarjetaService: MedioDePagoTarjetaService,
    protected tarjetaService: TarjetaService,
    protected tipoTarjetaService: TipoTarjetaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ medioDePagoTarjeta }) => {
      this.updateForm(medioDePagoTarjeta);
    });
    this.tarjetaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITarjeta[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITarjeta[]>) => response.body)
      )
      .subscribe((res: ITarjeta[]) => (this.tarjetas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoTarjetaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoTarjeta[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoTarjeta[]>) => response.body)
      )
      .subscribe((res: ITipoTarjeta[]) => (this.tipotarjetas = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(medioDePagoTarjeta: IMedioDePagoTarjeta) {
    this.editForm.patchValue({
      id: medioDePagoTarjeta.id,
      ultimos4: medioDePagoTarjeta.ultimos4,
      tarjeta: medioDePagoTarjeta.tarjeta,
      tipoTarjeta: medioDePagoTarjeta.tipoTarjeta
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const medioDePagoTarjeta = this.createFromForm();
    if (medioDePagoTarjeta.id !== undefined) {
      this.subscribeToSaveResponse(this.medioDePagoTarjetaService.update(medioDePagoTarjeta));
    } else {
      this.subscribeToSaveResponse(this.medioDePagoTarjetaService.create(medioDePagoTarjeta));
    }
  }

  private createFromForm(): IMedioDePagoTarjeta {
    return {
      ...new MedioDePagoTarjeta(),
      id: this.editForm.get(['id']).value,
      ultimos4: this.editForm.get(['ultimos4']).value,
      tarjeta: this.editForm.get(['tarjeta']).value,
      tipoTarjeta: this.editForm.get(['tipoTarjeta']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedioDePagoTarjeta>>) {
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

  trackTarjetaById(index: number, item: ITarjeta) {
    return item.id;
  }

  trackTipoTarjetaById(index: number, item: ITipoTarjeta) {
    return item.id;
  }
}
