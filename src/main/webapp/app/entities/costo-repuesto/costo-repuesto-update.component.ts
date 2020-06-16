import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { ICostoRepuesto, CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { CostoRepuestoService } from './costo-repuesto.service';
import { ITipoRepuesto } from 'app/shared/model/tipo-repuesto.model';
import { TipoRepuestoService } from 'app/entities/tipo-repuesto/tipo-repuesto.service';
import { IProveedor } from 'app/shared/model/proveedor.model';
import { ProveedorService } from 'app/entities/proveedor/proveedor.service';
import { IEstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from 'app/entities/estado-costo-repuesto/estado-costo-repuesto.service';

@Component({
  selector: 'jhi-costo-repuesto-update',
  templateUrl: './costo-repuesto-update.component.html'
})
export class CostoRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  tiporepuestos: ITipoRepuesto[];

  proveedors: IProveedor[];

  estadocostorepuestos: IEstadoCostoRepuesto[];

  editForm = this.fb.group({
    id: [],
    valor: [null, [Validators.required, Validators.min(0)]],
    tipoRepuesto: [null, Validators.required],
    proveedor: [],
    estado: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected costoRepuestoService: CostoRepuestoService,
    protected tipoRepuestoService: TipoRepuestoService,
    protected proveedorService: ProveedorService,
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ costoRepuesto }) => {
      this.updateForm(costoRepuesto);
    });
    this.tipoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ITipoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<ITipoRepuesto[]>) => response.body)
      )
      .subscribe((res: ITipoRepuesto[]) => (this.tiporepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.proveedorService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IProveedor[]>) => mayBeOk.ok),
        map((response: HttpResponse<IProveedor[]>) => response.body)
      )
      .subscribe((res: IProveedor[]) => (this.proveedors = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.estadoCostoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoCostoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoCostoRepuesto[]>) => response.body)
      )
      .subscribe((res: IEstadoCostoRepuesto[]) => (this.estadocostorepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(costoRepuesto: ICostoRepuesto) {
    this.editForm.patchValue({
      id: costoRepuesto.id,
      valor: costoRepuesto.valor,
      tipoRepuesto: costoRepuesto.tipoRepuesto,
      proveedor: costoRepuesto.proveedor,
      estado: costoRepuesto.estado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const costoRepuesto = this.createFromForm();
    if (costoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.costoRepuestoService.update(costoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.costoRepuestoService.create(costoRepuesto));
    }
  }

  private createFromForm(): ICostoRepuesto {
    return {
      ...new CostoRepuesto(),
      id: this.editForm.get(['id']).value,
      valor: this.editForm.get(['valor']).value,
      tipoRepuesto: this.editForm.get(['tipoRepuesto']).value,
      proveedor: this.editForm.get(['proveedor']).value,
      estado: this.editForm.get(['estado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICostoRepuesto>>) {
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

  trackProveedorById(index: number, item: IProveedor) {
    return item.id;
  }

  trackEstadoCostoRepuestoById(index: number, item: IEstadoCostoRepuesto) {
    return item.id;
  }
}
