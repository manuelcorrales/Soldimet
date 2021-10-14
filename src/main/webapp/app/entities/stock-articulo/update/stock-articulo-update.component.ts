import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IStockArticulo, StockArticulo } from '../stock-articulo.model';
import { StockArticuloService } from '../service/stock-articulo.service';
import { IMedidaArticulo } from 'app/entities/medida-articulo/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/service/medida-articulo.service';
import { IArticulo } from 'app/entities/articulo/articulo.model';
import { ArticuloService } from 'app/entities/articulo/service/articulo.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

@Component({
  selector: 'jhi-stock-articulo-update',
  templateUrl: './stock-articulo-update.component.html',
})
export class StockArticuloUpdateComponent implements OnInit {
  isSaving = false;

  medidaArticulosSharedCollection: IMedidaArticulo[] = [];
  articulosSharedCollection: IArticulo[] = [];
  sucursalsSharedCollection: ISucursal[] = [];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    medida: [null, Validators.required],
    articulo: [null, Validators.required],
    sucursal: [null, Validators.required],
  });

  constructor(
    protected stockArticuloService: StockArticuloService,
    protected medidaArticuloService: MedidaArticuloService,
    protected articuloService: ArticuloService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ stockArticulo }) => {
      this.updateForm(stockArticulo);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const stockArticulo = this.createFromForm();
    if (stockArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.stockArticuloService.update(stockArticulo));
    } else {
      this.subscribeToSaveResponse(this.stockArticuloService.create(stockArticulo));
    }
  }

  trackMedidaArticuloById(index: number, item: IMedidaArticulo): number {
    return item.id!;
  }

  trackArticuloById(index: number, item: IArticulo): number {
    return item.id!;
  }

  trackSucursalById(index: number, item: ISucursal): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockArticulo>>): void {
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

  protected updateForm(stockArticulo: IStockArticulo): void {
    this.editForm.patchValue({
      id: stockArticulo.id,
      cantidad: stockArticulo.cantidad,
      medida: stockArticulo.medida,
      articulo: stockArticulo.articulo,
      sucursal: stockArticulo.sucursal,
    });

    this.medidaArticulosSharedCollection = this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(
      this.medidaArticulosSharedCollection,
      stockArticulo.medida
    );
    this.articulosSharedCollection = this.articuloService.addArticuloToCollectionIfMissing(
      this.articulosSharedCollection,
      stockArticulo.articulo
    );
    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(
      this.sucursalsSharedCollection,
      stockArticulo.sucursal
    );
  }

  protected loadRelationshipsOptions(): void {
    this.medidaArticuloService
      .query()
      .pipe(map((res: HttpResponse<IMedidaArticulo[]>) => res.body ?? []))
      .pipe(
        map((medidaArticulos: IMedidaArticulo[]) =>
          this.medidaArticuloService.addMedidaArticuloToCollectionIfMissing(medidaArticulos, this.editForm.get('medida')!.value)
        )
      )
      .subscribe((medidaArticulos: IMedidaArticulo[]) => (this.medidaArticulosSharedCollection = medidaArticulos));

    this.articuloService
      .query()
      .pipe(map((res: HttpResponse<IArticulo[]>) => res.body ?? []))
      .pipe(
        map((articulos: IArticulo[]) =>
          this.articuloService.addArticuloToCollectionIfMissing(articulos, this.editForm.get('articulo')!.value)
        )
      )
      .subscribe((articulos: IArticulo[]) => (this.articulosSharedCollection = articulos));

    this.sucursalService
      .query()
      .pipe(map((res: HttpResponse<ISucursal[]>) => res.body ?? []))
      .pipe(
        map((sucursals: ISucursal[]) =>
          this.sucursalService.addSucursalToCollectionIfMissing(sucursals, this.editForm.get('sucursal')!.value)
        )
      )
      .subscribe((sucursals: ISucursal[]) => (this.sucursalsSharedCollection = sucursals));
  }

  protected createFromForm(): IStockArticulo {
    return {
      ...new StockArticulo(),
      id: this.editForm.get(['id'])!.value,
      cantidad: this.editForm.get(['cantidad'])!.value,
      medida: this.editForm.get(['medida'])!.value,
      articulo: this.editForm.get(['articulo'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value,
    };
  }
}
