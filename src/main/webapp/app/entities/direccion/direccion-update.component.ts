import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDireccion, Direccion } from 'app/shared/model/direccion.model';
import { DireccionService } from './direccion.service';
import { ILocalidad } from 'app/shared/model/localidad.model';
import { LocalidadService } from 'app/entities/localidad/localidad.service';

@Component({
  selector: 'jhi-direccion-update',
  templateUrl: './direccion-update.component.html'
})
export class DireccionUpdateComponent implements OnInit {
  isSaving: boolean;

  localidads: ILocalidad[];

  editForm = this.fb.group({
    id: [],
    calle: [null, [Validators.required, Validators.minLength(3)]],
    numero: [null, [Validators.required, Validators.min(0)]],
    localidad: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected direccionService: DireccionService,
    protected localidadService: LocalidadService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ direccion }) => {
      this.updateForm(direccion);
    });
    this.localidadService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ILocalidad[]>) => mayBeOk.ok),
        map((response: HttpResponse<ILocalidad[]>) => response.body)
      )
      .subscribe((res: ILocalidad[]) => (this.localidads = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(direccion: IDireccion) {
    this.editForm.patchValue({
      id: direccion.id,
      calle: direccion.calle,
      numero: direccion.numero,
      localidad: direccion.localidad
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const direccion = this.createFromForm();
    if (direccion.id !== undefined) {
      this.subscribeToSaveResponse(this.direccionService.update(direccion));
    } else {
      this.subscribeToSaveResponse(this.direccionService.create(direccion));
    }
  }

  private createFromForm(): IDireccion {
    return {
      ...new Direccion(),
      id: this.editForm.get(['id']).value,
      calle: this.editForm.get(['calle']).value,
      numero: this.editForm.get(['numero']).value,
      localidad: this.editForm.get(['localidad']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDireccion>>) {
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

  trackLocalidadById(index: number, item: ILocalidad) {
    return item.id;
  }
}
