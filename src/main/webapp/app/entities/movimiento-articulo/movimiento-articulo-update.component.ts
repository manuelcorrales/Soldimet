import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMovimientoArticulo, MovimientoArticulo } from 'app/shared/model/movimiento-articulo.model';
import { MovimientoArticuloService } from './movimiento-articulo.service';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/movimiento.service';

@Component({
  selector: 'jhi-movimiento-articulo-update',
  templateUrl: './movimiento-articulo-update.component.html'
})
export class MovimientoArticuloUpdateComponent implements OnInit {
  isSaving: boolean;

  articulos: IArticulo[];

  movimientos: IMovimiento[];

  editForm = this.fb.group({
    id: [],
    cantidad: [null, [Validators.required, Validators.min(1)]],
    articulo: [null, Validators.required],
    movimiento: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected movimientoArticuloService: MovimientoArticuloService,
    protected articuloService: ArticuloService,
    protected movimientoService: MovimientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ movimientoArticulo }) => {
      this.updateForm(movimientoArticulo);
    });
    this.articuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticulo[]>) => response.body)
      )
      .subscribe((res: IArticulo[]) => (this.articulos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.movimientoService
      .query({ filter: 'movimientoarticulo-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMovimiento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMovimiento[]>) => response.body)
      )
      .subscribe(
        (res: IMovimiento[]) => {
          if (!this.editForm.get('movimiento').value || !this.editForm.get('movimiento').value.id) {
            this.movimientos = res;
          } else {
            this.movimientoService
              .find(this.editForm.get('movimiento').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMovimiento>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMovimiento>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMovimiento) => (this.movimientos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(movimientoArticulo: IMovimientoArticulo) {
    this.editForm.patchValue({
      id: movimientoArticulo.id,
      cantidad: movimientoArticulo.cantidad,
      articulo: movimientoArticulo.articulo,
      movimiento: movimientoArticulo.movimiento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const movimientoArticulo = this.createFromForm();
    if (movimientoArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoArticuloService.update(movimientoArticulo));
    } else {
      this.subscribeToSaveResponse(this.movimientoArticuloService.create(movimientoArticulo));
    }
  }

  private createFromForm(): IMovimientoArticulo {
    return {
      ...new MovimientoArticulo(),
      id: this.editForm.get(['id']).value,
      cantidad: this.editForm.get(['cantidad']).value,
      articulo: this.editForm.get(['articulo']).value,
      movimiento: this.editForm.get(['movimiento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoArticulo>>) {
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

  trackArticuloById(index: number, item: IArticulo) {
    return item.id;
  }

  trackMovimientoById(index: number, item: IMovimiento) {
    return item.id;
  }
}
