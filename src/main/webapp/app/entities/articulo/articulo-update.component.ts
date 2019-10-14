import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IArticulo, Articulo } from 'app/shared/model/articulo.model';
import { ArticuloService } from './articulo.service';
import { IEstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';
import { IMarca } from 'app/shared/model/marca.model';
import { MarcaService } from 'app/entities/marca/marca.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';

@Component({
  selector: 'jhi-articulo-update',
  templateUrl: './articulo-update.component.html'
})
export class ArticuloUpdateComponent implements OnInit {
  isSaving: boolean;

  estadoarticulos: IEstadoArticulo[];

  marcas: IMarca[];

  tiporepuestos: ITipoRepuesto[];

  editForm = this.fb.group({
    id: [],
    descripcion: [null, [Validators.required]],
    codigoArticuloProveedor: [null, [Validators.minLength(2), Validators.maxLength(20)]],
    estado: [null, Validators.required],
    marca: [null, Validators.required],
    tipoRepuesto: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected articuloService: ArticuloService,
    protected estadoArticuloService: EstadoArticuloService,
    protected marcaService: MarcaService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ articulo }) => {
      this.updateForm(articulo);
    });
    this.estadoArticuloService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoArticulo[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoArticulo[]>) => response.body)
      )
      .subscribe((res: IEstadoArticulo[]) => (this.estadoarticulos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.marcaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IMarca[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMarca[]>) => response.body)
      )
      .subscribe((res: IMarca[]) => (this.marcas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoRepuesto[]>) => response.body)
      )
      .subscribe((res: ITipoRepuesto[]) => (this.tiporepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(articulo: IArticulo) {
    this.editForm.patchValue({
      id: articulo.id,
      descripcion: articulo.descripcion,
      codigoArticuloProveedor: articulo.codigoArticuloProveedor,
      estado: articulo.estado,
      marca: articulo.marca,
      tipoRepuesto: articulo.tipoRepuesto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const articulo = this.createFromForm();
    if (articulo.id !== undefined) {
      this.subscribeToSaveResponse(this.articuloService.update(articulo));
    } else {
      this.subscribeToSaveResponse(this.articuloService.create(articulo));
    }
  }

  private createFromForm(): IArticulo {
    return {
      ...new Articulo(),
      id: this.editForm.get(['id']).value,
      descripcion: this.editForm.get(['descripcion']).value,
      codigoArticuloProveedor: this.editForm.get(['codigoArticuloProveedor']).value,
      estado: this.editForm.get(['estado']).value,
      marca: this.editForm.get(['marca']).value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IArticulo>>) {
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

  trackEstadoArticuloById(index: number, item: IEstadoArticulo) {
    return item.id;
  }

  trackMarcaById(index: number, item: IMarca) {
    return item.id;
  }

  trackTipoRepuestoById(index: number, item: ITipoRepuesto) {
    return item.id;
  }
}
