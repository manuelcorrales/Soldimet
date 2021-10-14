import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICostoRepuesto, CostoRepuesto } from '../costo-repuesto.model';
import { CostoRepuestoService } from '../service/costo-repuesto.service';
import { IEstadoCostoRepuesto } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/service/estado-costo-repuesto.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';

@Component({
  selector: 'jhi-costo-repuesto-update',
  templateUrl: './costo-repuesto-update.component.html',
})
export class CostoRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  estadoCostoRepuestosSharedCollection: IEstadoCostoRepuesto[] = [];
  articulosSharedCollection: IArticulo[] = [];
  tipoRepuestosSharedCollection: ITipoRepuesto[] = [];
  medidaArticulosSharedCollection: IMedidaArticulo[] = [];

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required, Validators.min(0)]],
    estado: [null, Validators.required],
    articulo: [],
    tipoRepuesto: [],
    medidaArticulo: [],
  });

  constructor(
    protected costoRepuestoService: CostoRepuestoService,
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    protected articuloService: ArticuloService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected medidaArticuloService: MedidaArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
      this.updateForm(costoRepuesto);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const costoRepuesto = this.createFromForm();
    if (costoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.costoRepuestoService.update(costoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.costoRepuestoService.create(costoRepuesto));
    }
  }

  trackEstadoCostoRepuestoById(index: number, item: IEstadoCostoRepuesto): number {
    return item.id!;
  }

  trackArticuloById(index: number, item: IArticulo): number {
    return item.id!;
  }

  trackTipoRepuestoById(index: number, item: ITipoRepuesto): number {
    return item.id!;
  }

  trackMedidaArticuloById(index: number, item: IMedidaArticulo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoRepuesto>>): void {
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

  protected updateForm(costoRepuesto: ICostoRepuesto): void {
    this.editForm.patchValue({
      id: costoRepuesto.id,
      valor: costoRepuesto.valor,
      estado: costoRepuesto.estado,
      articulo: costoRepuesto.articulo,
      tipoRepuesto: costoRepuesto.tipoRepuesto,
      medidaArticulo: costoRepuesto.medidaArticulo,
    });

    this.estadoCostoRepuestosSharedCollection = this.estadoCostoRepuestoService.addEstadoCostoRepuestoToCollectionIfMissing(
      this.estadoCostoRepuestosSharedCollection,
      costoRepuesto.estado
    );
    this.articulosSharedCollection = this.articuloService.addArticuloToCollectionIfMissing(
      this.articulosSharedCollection,
      costoRepuesto.articulo
    );
    this.tipoRepuestosSharedCollection = this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(
      this.tipoRepuestosSharedCollection,
      costoRepuesto.tipoRepuesto
    );
    this.medidaArticulosSharedCollection = this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(
      this.medidaArticulosSharedCollection,
      costoRepuesto.medidaArticulo
    );
  }

  protected loadRelationshipsOptions(): void {
    this.estadoCostoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<IEstadoCostoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((estadoCostoRepuestos: IEstadoCostoRepuesto[]) =>
          this.estadoCostoRepuestoService.addEstadoCostoRepuestoToCollectionIfMissing(
            estadoCostoRepuestos,
            this.editForm.get('estado')!.value
          )
        )
      )
      .subscribe((estadoCostoRepuestos: IEstadoCostoRepuesto[]) => (this.estadoCostoRepuestosSharedCollection = estadoCostoRepuestos));

    this.articuloService
      .query()
      .pipe(map((res: HttpResponse<IArticulo[]>) => res.body ?? []))
      .pipe(
        map((articulos: IArticulo[]) =>
          this.articuloService.addArticuloToCollectionIfMissing(articulos, this.editForm.get('articulo')!.value)
        )
      )
      .subscribe((articulos: IArticulo[]) => (this.articulosSharedCollection = articulos));

    this.tipoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<ITipoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((tipoRepuestos: ITipoRepuesto[]) =>
          this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(tipoRepuestos, this.editForm.get('tipoRepuesto')!.value)
        )
      )
      .subscribe((tipoRepuestos: ITipoRepuesto[]) => (this.tipoRepuestosSharedCollection = tipoRepuestos));

    this.medidaArticuloService
      .query()
      .pipe(map((res: HttpResponse<IMedidaArticulo[]>) => res.body ?? []))
      .pipe(
        map((medidaArticulos: IMedidaArticulo[]) =>
          this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(medidaArticulos, this.editForm.get('medidaArticulo')!.value)
        )
      )
      .subscribe((medidaArticulos: IMedidaArticulo[]) => (this.medidaArticulosSharedCollection = medidaArticulos));
  }

  protected createFromForm(): ICostoRepuesto {
    return {
      ...new CostoRepuesto(),
      id: this.editForm.get(['id'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      articulo: this.editForm.get(['articulo'])!.value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto'])!.value,
      medidaArticulo: this.editForm.get(['medidaArticulo'])!.value,
    };
  }
}
