import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICobranzaRepuesto, CobranzaRepuesto } from '../cobranza-repuesto.model';
import { CobranzaRepuestoService } from '../service/cobranza-repuesto.service';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';

@Component({
  selector: 'jhi-cobranza-repuesto-update',
  templateUrl: './cobranza-repuesto-update.component.html',
})
export class CobranzaRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  tipoRepuestosSharedCollection: ITipoRepuesto[] = [];
  articulosSharedCollection: IArticulo[] = [];

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required, Validators.min(0)]],
    tipoRepuesto: [null, Validators.required],
    articulo: [],
  });

  constructor(
    protected cobranzaRepuestoService: CobranzaRepuestoService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected articuloService: ArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ cobranzaRepuesto }) => {
      this.updateForm(cobranzaRepuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const cobranzaRepuesto = this.createFromForm();
    if (cobranzaRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.cobranzaRepuestoService.update(cobranzaRepuesto));
    } else {
      this.subscribeToSaveResponse(this.cobranzaRepuestoService.create(cobranzaRepuesto));
    }
  }

  trackTipoRepuestoById(index: number, item: ITipoRepuesto): number {
    return item.id!;
  }

  trackArticuloById(index: number, item: IArticulo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICobranzaRepuesto>>): void {
    result.pipe(finalize(() => this.onSaveFinalize())).subscribe(
      () => this.onSaveSuccess(),
      () => this.onSaveError()
    );
  }

  protected onSaveSuccess(): void {
    this.previousState();
  }

  protected onSaveError(): void {
    // Api for inheritance.
  }

  protected onSaveFinalize(): void {
    this.isSaving = false;
  }

  protected updateForm(cobranzaRepuesto: ICobranzaRepuesto): void {
    this.editForm.patchValue({
      id: cobranzaRepuesto.id,
      valor: cobranzaRepuesto.valor,
      tipoRepuesto: cobranzaRepuesto.tipoRepuesto,
      articulo: cobranzaRepuesto.articulo,
    });

    this.tipoRepuestosSharedCollection = this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(
      this.tipoRepuestosSharedCollection,
      cobranzaRepuesto.tipoRepuesto
    );
    this.articulosSharedCollection = this.articuloService.addArticuloToCollectionIfMissing(
      this.articulosSharedCollection,
      cobranzaRepuesto.articulo
    );
  }

  protected loadRelationshipsOptions(): void {
    this.tipoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<ITipoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((tipoRepuestos: ITipoRepuesto[]) =>
          this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(tipoRepuestos, this.editForm.get('tipoRepuesto')!.value)
        )
      )
      .subscribe((tipoRepuestos: ITipoRepuesto[]) => (this.tipoRepuestosSharedCollection = tipoRepuestos));

    this.articuloService
      .query()
      .pipe(map((res: HttpResponse<IArticulo[]>) => res.body ?? []))
      .pipe(
        map((articulos: IArticulo[]) =>
          this.articuloService.addArticuloToCollectionIfMissing(articulos, this.editForm.get('articulo')!.value)
        )
      )
      .subscribe((articulos: IArticulo[]) => (this.articulosSharedCollection = articulos));
  }

  protected createFromForm(): ICobranzaRepuesto {
    return {
      ...new CobranzaRepuesto(),
      id: this.editForm.get(['id'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto'])!.value,
      articulo: this.editForm.get(['articulo'])!.value,
    };
  }
}
