import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICostoRepuestoProveedor, CostoRepuestoProveedor } from 'app/shared/model/costo-repuesto-proveedor.model';
import { CostoRepuestoProveedorService } from './costo-repuesto-proveedor.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';
import { IAplicacion } from 'app/shared/model/aplicacion.model';
import { AplicacionService } from 'app/entities/aplicacion/aplicacion.service';
import { ICilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';
import { IArticulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from 'app/entities/articulo/articulo.service';

@Component({
  selector: 'jhi-costo-repuesto-proveedor-update',
  templateUrl: './costo-repuesto-proveedor-update.component.html'
})
export class CostoRepuestoProveedorUpdateComponent implements OnInit {
  isSaving: boolean;

  tiporepuestos: ITipoRepuesto[];

  aplicacions: IAplicacion[];

  cilindradas: ICilindrada[];

  articulos: IArticulo[];

  editForm = this.fb.group({
    id: [],
    tipoRepuesto: [null, Validators.required],
    aplicacion: [null, Validators.required],
    cilindrada: [null, Validators.required],
    articulo: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected costoRepuestoProveedorService: CostoRepuestoProveedorService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected aplicacionService: AplicacionService,
    protected cilindradaService: CilindradaService,
    protected articuloService: ArticuloService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ costoRepuestoProveedor }) => {
      this.updateForm(costoRepuestoProveedor);
    });
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoRepuesto[]>) => response.body)
      )
      .subscribe((res: ITipoRepuesto[]) => (this.tiporepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.aplicacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IAplicacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IAplicacion[]>) => response.body)
      )
      .subscribe((res: IAplicacion[]) => (this.aplicacions = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.cilindradaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ICilindrada[]>) => mayBeOk.ok),
        map((response: HttpResponse<ICilindrada[]>) => response.body)
      )
      .subscribe((res: ICilindrada[]) => (this.cilindradas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.articuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IArticulo[]>) => response.body)
      )
      .subscribe((res: IArticulo[]) => (this.articulos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(costoRepuestoProveedor: ICostoRepuestoProveedor) {
    this.editForm.patchValue({
      id: costoRepuestoProveedor.id,
      tipoRepuesto: costoRepuestoProveedor.tipoRepuesto,
      aplicacion: costoRepuestoProveedor.aplicacion,
      cilindrada: costoRepuestoProveedor.cilindrada,
      articulo: costoRepuestoProveedor.articulo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const costoRepuestoProveedor = this.createFromForm();
    if (costoRepuestoProveedor.id !== undefined) {
      this.subscribeToSaveResponse(this.costoRepuestoProveedorService.update(costoRepuestoProveedor));
    } else {
      this.subscribeToSaveResponse(this.costoRepuestoProveedorService.create(costoRepuestoProveedor));
    }
  }

  private createFromForm(): ICostoRepuestoProveedor {
    return {
      ...new CostoRepuestoProveedor(),
      id: this.editForm.get(['id']).value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto']).value,
      aplicacion: this.editForm.get(['aplicacion']).value,
      cilindrada: this.editForm.get(['cilindrada']).value,
      articulo: this.editForm.get(['articulo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoRepuestoProveedor>>) {
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

  trackAplicacionById(index: number, item: IAplicacion) {
    return item.id;
  }

  trackCilindradaById(index: number, item: ICilindrada) {
    return item.id;
  }

  trackArticuloById(index: number, item: IArticulo) {
    return item.id;
  }
}
