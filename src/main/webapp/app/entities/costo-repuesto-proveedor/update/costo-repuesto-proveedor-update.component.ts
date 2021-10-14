import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { ICostoRepuestoProveedor, CostoRepuestoProveedor } from '../costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from '../service/costo-repuesto-proveedor.service';
import { ITipoRepuesto } from 'app/entities/tipo-repuesto/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/service/tipo-repuesto.service';
import { IAplicacion } from 'app/entities/aplicacion/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/service/aplicacion.service';
import { ICilindrada } from 'app/entities/cilindrada/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/service/cilindrada.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';

@Component({
  selector: 'jhi-costo-repuesto-proveedor-update',
  templateUrl: './costo-repuesto-proveedor-update.component.html',
})
export class CostoRepuestoProveedorUpdateComponent implements OnInit {
  isSaving = false;

  tipoRepuestosSharedCollection: ITipoRepuesto[] = [];
  aplicacionsSharedCollection: IAplicacion[] = [];
  cilindradasSharedCollection: ICilindrada[] = [];
  articulosSharedCollection: IArticulo[] = [];

  editForm = this.fb.group({
    id: [],
    tipoRepuesto: [null, Validators.required],
    aplicacion: [null, Validators.required],
    cilindrada: [null, Validators.required],
    articulo: [],
  });

  constructor(
    protected costoRepuestoProveedorService: CostoRepuestoProveedorService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected aplicacionService: AplicacionService,
    protected cilindradaService: CilindradaService,
    protected articuloService: ArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ costoRepuestoProveedor }) => {
      this.updateForm(costoRepuestoProveedor);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const costoRepuestoProveedor = this.createFromForm();
    if (costoRepuestoProveedor.id !== undefined) {
      this.subscribeToSaveResponse(this.costoRepuestoProveedorService.update(costoRepuestoProveedor));
    } else {
      this.subscribeToSaveResponse(this.costoRepuestoProveedorService.create(costoRepuestoProveedor));
    }
  }

  trackTipoRepuestoById(index: number, item: ITipoRepuesto): number {
    return item.id!;
  }

  trackAplicacionById(index: number, item: IAplicacion): number {
    return item.id!;
  }

  trackCilindradaById(index: number, item: ICilindrada): number {
    return item.id!;
  }

  trackArticuloById(index: number, item: IArticulo): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoRepuestoProveedor>>): void {
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

  protected updateForm(costoRepuestoProveedor: ICostoRepuestoProveedor): void {
    this.editForm.patchValue({
      id: costoRepuestoProveedor.id,
      tipoRepuesto: costoRepuestoProveedor.tipoRepuesto,
      aplicacion: costoRepuestoProveedor.aplicacion,
      cilindrada: costoRepuestoProveedor.cilindrada,
      articulo: costoRepuestoProveedor.articulo,
    });

    this.tipoRepuestosSharedCollection = this.tipoRepuestoService.addTipoRepuestoToCollectionIfMissing(
      this.tipoRepuestosSharedCollection,
      costoRepuestoProveedor.tipoRepuesto
    );
    this.aplicacionsSharedCollection = this.aplicacionService.addAplicacionToCollectionIfMissing(
      this.aplicacionsSharedCollection,
      costoRepuestoProveedor.aplicacion
    );
    this.cilindradasSharedCollection = this.cilindradaService.addCilindradaToCollectionIfMissing(
      this.cilindradasSharedCollection,
      costoRepuestoProveedor.cilindrada
    );
    this.articulosSharedCollection = this.articuloService.addArticuloToCollectionIfMissing(
      this.articulosSharedCollection,
      costoRepuestoProveedor.articulo
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

    this.aplicacionService
      .query()
      .pipe(map((res: HttpResponse<IAplicacion[]>) => res.body ?? []))
      .pipe(
        map((aplicacions: IAplicacion[]) =>
          this.aplicacionService.addAplicacionToCollectionIfMissing(aplicacions, this.editForm.get('aplicacion')!.value)
        )
      )
      .subscribe((aplicacions: IAplicacion[]) => (this.aplicacionsSharedCollection = aplicacions));

    this.cilindradaService
      .query()
      .pipe(map((res: HttpResponse<ICilindrada[]>) => res.body ?? []))
      .pipe(
        map((cilindradas: ICilindrada[]) =>
          this.cilindradaService.addCilindradaToCollectionIfMissing(cilindradas, this.editForm.get('cilindrada')!.value)
        )
      )
      .subscribe((cilindradas: ICilindrada[]) => (this.cilindradasSharedCollection = cilindradas));

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

  protected createFromForm(): ICostoRepuestoProveedor {
    return {
      ...new CostoRepuestoProveedor(),
      id: this.editForm.get(['id'])!.value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto'])!.value,
      aplicacion: this.editForm.get(['aplicacion'])!.value,
      cilindrada: this.editForm.get(['cilindrada'])!.value,
      articulo: this.editForm.get(['articulo'])!.value,
    };
  }
}
