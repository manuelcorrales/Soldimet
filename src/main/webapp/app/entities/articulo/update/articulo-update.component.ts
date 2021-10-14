import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IArticulo, Articulo } from '../articulo.model';
import { ArticuloService } from '../service/articulo.service';
import { IEstadoArticulo } from 'app/entities/estado-articulo/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo/service/estado-articulo.service';
import { IMarca } from 'app/entities/marca/marca.model';
import { MarcaService } from 'app/entities/marca/service/marca.service';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';

@Component({
  selector: 'jhi-articulo-update',
  templateUrl: './articulo-update.component.html',
})
export class ArticuloUpdateComponent implements OnInit {
  isSaving = false;

  estadoArticulosSharedCollection: IEstadoArticulo[] = [];
  marcasSharedCollection: IMarca[] = [];
  tipoRepuestosSharedCollection: ITipoRepuesto[] = [];

  editForm = this.fb.group({
    id: [],
    codigoArticuloProveedor: [],
    valor: [null, [Validators.required]],
    fechaCosto: [],
    costoProveedor: [],
    fechaCostoProveedor: [],
    estado: [null, Validators.required],
    marca: [],
    tipoRepuesto: [null, Validators.required],
  });

  constructor(
    protected articuloService: ArticuloService,
    protected estadoArticuloService: EstadoArticuloService,
    protected marcaService: MarcaService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ articulo }) => {
      this.updateForm(articulo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const articulo = this.createFromForm();
    if (articulo.id !== undefined) {
      this.subscribeToSaveResponse(this.articuloService.update(articulo));
    } else {
      this.subscribeToSaveResponse(this.articuloService.create(articulo));
    }
  }

  trackEstadoArticuloById(index: number, item: IEstadoArticulo): number {
    return item.id!;
  }

  trackMarcaById(index: number, item: IMarca): number {
    return item.id!;
  }

  trackTipoRepuestoById(index: number, item: ITipoRepuesto): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticulo>>): void {
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

  protected updateForm(articulo: IArticulo): void {
    this.editForm.patchValue({
      id: articulo.id,
      codigoArticuloProveedor: articulo.codigoArticuloProveedor,
      valor: articulo.valor,
      fechaCosto: articulo.fechaCosto,
      costoProveedor: articulo.costoProveedor,
      fechaCostoProveedor: articulo.fechaCostoProveedor,
      estado: articulo.estado,
      marca: articulo.marca,
      tipoRepuesto: articulo.tipoRepuesto,
    });

    this.estadoArticulosSharedCollection = this.estadoArticuloService.addEstadoArticuloToCollectionIfMissing(
      this.estadoArticulosSharedCollection,
      articulo.estado
    );
    this.marcasSharedCollection = this.marcaService.addMarcaToCollectionIfMissing(this.marcasSharedCollection, articulo.marca);
    this.tipoRepuestosSharedCollection = this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(
      this.tipoRepuestosSharedCollection,
      articulo.tipoRepuesto
    );
  }

  protected loadRelationshipsOptions(): void {
    this.estadoArticuloService
      .query()
      .pipe(map((res: HttpResponse<IEstadoArticulo[]>) => res.body ?? []))
      .pipe(
        map((estadoArticulos: IEstadoArticulo[]) =>
          this.estadoArticuloService.addEstadoArticuloToCollectionIfMissing(estadoArticulos, this.editForm.get('estado')!.value)
        )
      )
      .subscribe((estadoArticulos: IEstadoArticulo[]) => (this.estadoArticulosSharedCollection = estadoArticulos));

    this.marcaService
      .query()
      .pipe(map((res: HttpResponse<IMarca[]>) => res.body ?? []))
      .pipe(map((marcas: IMarca[]) => this.marcaService.addMarcaToCollectionIfMissing(marcas, this.editForm.get('marca')!.value)))
      .subscribe((marcas: IMarca[]) => (this.marcasSharedCollection = marcas));

    this.tipoRepuestoService
      .query()
      .pipe(map((res: HttpResponse<ITipoRepuesto[]>) => res.body ?? []))
      .pipe(
        map((tipoRepuestos: ITipoRepuesto[]) =>
          this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(tipoRepuestos, this.editForm.get('tipoRepuesto')!.value)
        )
      )
      .subscribe((tipoRepuestos: ITipoRepuesto[]) => (this.tipoRepuestosSharedCollection = tipoRepuestos));
  }

  protected createFromForm(): IArticulo {
    return {
      ...new Articulo(),
      id: this.editForm.get(['id'])!.value,
      codigoArticuloProveedor: this.editForm.get(['codigoArticuloProveedor'])!.value,
      valor: this.editForm.get(['valor'])!.value,
      fechaCosto: this.editForm.get(['fechaCosto'])!.value,
      costoProveedor: this.editForm.get(['costoProveedor'])!.value,
      fechaCostoProveedor: this.editForm.get(['fechaCostoProveedor'])!.value,
      estado: this.editForm.get(['estado'])!.value,
      marca: this.editForm.get(['marca'])!.value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto'])!.value,
    };
  }
}
