import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from './lista-precio-rectificacion-cram.service';
import { ICostoOperacion } from 'app/shared/model/costo-operacion.model';
import { CostoOperacionService } from 'app/entities/costo-operacion/costo-operacion.service';

@Component({
  selector: 'jhi-lista-precio-rectificacion-cram-update',
  templateUrl: './lista-precio-rectificacion-cram-update.component.html'
})
export class ListaPrecioRectificacionCRAMUpdateComponent implements OnInit {
  isSaving: boolean;

  costooperacions: ICostoOperacion[];
  fechaVigenciaDesdeDp: any;
  fechaVigenciaHastaDp: any;

  editForm = this.fb.group({
    id: [],
    fechaVigenciaDesde: [null, [Validators.required]],
    fechaVigenciaHasta: [],
    numeroGrupo: [null, [Validators.required, Validators.min(1), Validators.max(25)]],
    costoOperacion: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
    protected costoOperacionService: CostoOperacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
      this.updateForm(listaPrecioRectificacionCRAM);
    });
    this.costoOperacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICostoOperacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICostoOperacion[]>) => response.body)
      )
      .subscribe((res: ICostoOperacion[]) => (this.costooperacions = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM) {
    this.editForm.patchValue({
      id: listaPrecioRectificacionCRAM.id,
      fechaVigenciaDesde: listaPrecioRectificacionCRAM.fechaVigenciaDesde,
      fechaVigenciaHasta: listaPrecioRectificacionCRAM.fechaVigenciaHasta,
      numeroGrupo: listaPrecioRectificacionCRAM.numeroGrupo,
      costoOperacion: listaPrecioRectificacionCRAM.costoOperacion
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const listaPrecioRectificacionCRAM = this.createFromForm();
    if (listaPrecioRectificacionCRAM.id !== undefined) {
      this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.update(listaPrecioRectificacionCRAM));
    } else {
      this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.create(listaPrecioRectificacionCRAM));
    }
  }

  private createFromForm(): IListaPrecioRectificacionCRAM {
    return {
      ...new ListaPrecioRectificacionCRAM(),
      id: this.editForm.get(['id']).value,
      fechaVigenciaDesde: this.editForm.get(['fechaVigenciaDesde']).value,
      fechaVigenciaHasta: this.editForm.get(['fechaVigenciaHasta']).value,
      numeroGrupo: this.editForm.get(['numeroGrupo']).value,
      costoOperacion: this.editForm.get(['costoOperacion']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioRectificacionCRAM>>) {
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

  trackCostoOperacionById(index: number, item: ICostoOperacion) {
    return item.id;
  }
}
