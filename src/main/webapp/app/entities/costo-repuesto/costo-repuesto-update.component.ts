import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICostoRepuesto, CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';

@Component({
  selector: 'jhi-costo-repuesto-update',
  templateUrl: './costo-repuesto-update.component.html'
})
export class CostoRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  estadocostorepuestos: IEstadoCostoRepuesto[];

  articulos: IArticulo[];

  tiporepuestos: ITipoRepuesto[];

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required, Validators.min(0)]],
    medida: [],
    estado: [null, Validators.required],
    articulo: [],
    tipoRepuesto: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected costoRepuestoService: CostoRepuestoService,
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    protected articuloService: ArticuloService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
      this.updateForm(costoRepuesto);
    });
    this.estadoCostoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoCostoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoCostoRepuesto[]>) => response.body)
      )
      .subscribe((res: IEstadoCostoRepuesto[]) => (this.estadocostorepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticulo[]>) => response.body)
      )
      .subscribe((res: IArticulo[]) => (this.articulos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoRepuesto[]>) => response.body)
      )
      .subscribe((res: ITipoRepuesto[]) => (this.tiporepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(costoRepuesto: ICostoRepuesto) {
    this.editForm.patchValue({
      id: costoRepuesto.id,
      valor: costoRepuesto.valor,
      medida: costoRepuesto.medida,
      estado: costoRepuesto.estado,
      articulo: costoRepuesto.articulo,
      tipoRepuesto: costoRepuesto.tipoRepuesto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const costoRepuesto = this.createFromForm();
    if (costoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.costoRepuestoService.update(costoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.costoRepuestoService.create(costoRepuesto));
    }
  }

  private createFromForm(): ICostoRepuesto {
    return {
      ...new CostoRepuesto(),
      id: this.editForm.get(['id']).value,
      valor: this.editForm.get(['valor']).value,
      medida: this.editForm.get(['medida']).value,
      estado: this.editForm.get(['estado']).value,
      articulo: this.editForm.get(['articulo']).value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoRepuesto>>) {
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

  trackEstadoCostoRepuestoById(index: number, item: IEstadoCostoRepuesto) {
    return item.id;
  }

  trackArticuloById(index: number, item: IArticulo) {
    return item.id;
  }

  trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
    return item.id;
  }
}
