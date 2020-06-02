import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import * as moment from 'moment';
import { JhiAlertService } from 'ng-jhipster';
import { ICobranzaRepuesto, CobranzaRepuesto } from 'app/shared/model/cobranza-repuesto.model';
import { CobranzaRepuestoService } from './cobranza-repuesto.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca/marca.service';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';

@Component({
  selector: 'jhi-cobranza-repuesto-update',
  templateUrl: './cobranza-repuesto-update.component.html'
})
export class CobranzaRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  tiporepuestos: ITipoRepuesto[];

  marcas: IMarca[];

  cilindradas: ICilindrada[];

  aplicacions: IAplicacion[];
  fechaDp: any;

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required, Validators.min(0)]],
    detalle: [null, [Validators.required]],
    fecha: [],
    tipoRepuesto: [null, Validators.required],
    marca: [null, Validators.required],
    cilindrada: [null, Validators.required],
    aplicacion: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected cobranzaRepuestoService: CobranzaRepuestoService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected marcaService: MarcaService,
    protected cilindradaService: CilindradaService,
    protected aplicacionService: AplicacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
      this.updateForm(cobranzaRepuesto);
    });
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoRepuesto[]>) => response.body)
      )
      .subscribe((res: ITipoRepuesto[]) => (this.tiporepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.marcaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMarca[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarca[]>) => response.body)
      )
      .subscribe((res: IMarca[]) => (this.marcas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cilindradaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICilindrada[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICilindrada[]>) => response.body)
      )
      .subscribe((res: ICilindrada[]) => (this.cilindradas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.aplicacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAplicacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAplicacion[]>) => response.body)
      )
      .subscribe((res: IAplicacion[]) => (this.aplicacions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(cobranzaRepuesto: ICobranzaRepuesto) {
    this.editForm.patchValue({
      id: cobranzaRepuesto.id,
      valor: cobranzaRepuesto.valor,
      detalle: cobranzaRepuesto.detalle,
      fecha: cobranzaRepuesto.fecha,
      tipoRepuesto: cobranzaRepuesto.tipoRepuesto,
      marca: cobranzaRepuesto.marca,
      cilindrada: cobranzaRepuesto.cilindrada,
      aplicacion: cobranzaRepuesto.aplicacion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cobranzaRepuesto = this.createFromForm();
    if (cobranzaRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.cobranzaRepuestoService.update(cobranzaRepuesto));
    } else {
      this.subscribeToSaveResponse(this.cobranzaRepuestoService.create(cobranzaRepuesto));
    }
  }

  private createFromForm(): ICobranzaRepuesto {
    return {
      ...new CobranzaRepuesto(),
      id: this.editForm.get(['id']).value,
      valor: this.editForm.get(['valor']).value,
      detalle: this.editForm.get(['detalle']).value,
      fecha: this.editForm.get(['fecha']).value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto']).value,
      marca: this.editForm.get(['marca']).value,
      cilindrada: this.editForm.get(['cilindrada']).value,
      aplicacion: this.editForm.get(['aplicacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaRepuesto>>) {
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

  trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
    return item.id;
  }

  trackMarcaById(index: number, item: IMarca) {
    return item.id;
  }

  trackCilindradaById(index: number, item: ICilindrada) {
    return item.id;
  }

  trackAplicacionById(index: number, item: IAplicacion) {
    return item.id;
  }
}
