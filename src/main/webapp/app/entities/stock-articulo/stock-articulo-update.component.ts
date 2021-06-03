import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IStockArticulo, StockArticulo } from 'app/shared/model/stock-articulo.model';
import { StockArticuloService } from './stock-articulo.service';
import { IMedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { MedidaArticuloService } from 'app/entities/medida-articulo/medida-articulo.service';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';

@Component({
  selector: 'jhi-stock-articulo-update',
  templateUrl: './stock-articulo-update.component.html'
})
export class StockArticuloUpdateComponent implements OnInit {
  isSaving: boolean;

  medidaarticulos: IMedidaArticulo[];

  articulos: IArticulo[];

  sucursals: ISucursal[];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required]],
    medida: [null, Validators.required],
    articulo: [],
    sucursal: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected stockArticuloService: StockArticuloService,
    protected medidaArticuloService: MedidaArticuloService,
    protected articuloService: ArticuloService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ stockArticulo }) => {
      this.updateForm(stockArticulo);
    });
    this.medidaArticuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMedidaArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMedidaArticulo[]>) => response.body)
      )
      .subscribe((res: IMedidaArticulo[]) => (this.medidaarticulos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticulo[]>) => response.body)
      )
      .subscribe((res: IArticulo[]) => (this.articulos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.sucursalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISucursal[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISucursal[]>) => response.body)
      )
      .subscribe((res: ISucursal[]) => (this.sucursals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(stockArticulo: IStockArticulo) {
    this.editForm.patchValue({
      id: stockArticulo.id,
      cantidad: stockArticulo.cantidad,
      medida: stockArticulo.medida,
      articulo: stockArticulo.articulo,
      sucursal: stockArticulo.sucursal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const stockArticulo = this.createFromForm();
    if (stockArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.stockArticuloService.update(stockArticulo));
    } else {
      this.subscribeToSaveResponse(this.stockArticuloService.create(stockArticulo));
    }
  }

  protected createFromForm(): IStockArticulo {
    return {
      ...new StockArticulo(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      medida: this.editForm.get(['medida']).value,
      articulo: this.editForm.get(['articulo']).value,
      sucursal: this.editForm.get(['sucursal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IStockArticulo>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackMedidaArticuloById(index: number, item: IMedidaArticulo) {
    return item.id;
  }

  trackArticuloById(index: number, item: IArticulo) {
    return item.id;
  }

  trackSucursalById(index: number, item: ISucursal) {
    return item.id;
  }
}
