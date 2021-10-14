import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IDireccion, Direccion } from '../direccion.model';
import { DireccionService } from '../service/direccion.service';
import { ILocalidad } from 'app/entities/localidad/localidad.model';
import { LocalidadService } from 'app/entities/localidad/service/localidad.service';

@Component({
  selector: 'jhi-direccion-update',
  templateUrl: './direccion-update.component.html',
})
export class DireccionUpdateComponent implements OnInit {
  isSaving = false;

  localidadsSharedCollection: ILocalidad[] = [];

  editForm = this.fb.group({
    id: [],
    calle: [null, [Validators.required, Validators.minLength(3)]],
    numero: [null, [Validators.required, Validators.min(0)]],
    localidad: [null, Validators.required],
  });

  constructor(
    protected direccionService: DireccionService,
    protected localidadService: LocalidadService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ direccion }) => {
      this.updateForm(direccion);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const direccion = this.createFromForm();
    if (direccion.id !== undefined) {
      this.subscribeToSaveResponse(this.direccionService.update(direccion));
    } else {
      this.subscribeToSaveResponse(this.direccionService.create(direccion));
    }
  }

  trackLocalidadById(index: number, item: ILocalidad): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDireccion>>): void {
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

  protected updateForm(direccion: IDireccion): void {
    this.editForm.patchValue({
      id: direccion.id,
      calle: direccion.calle,
      numero: direccion.numero,
      localidad: direccion.localidad,
    });

    this.localidadsSharedCollection = this.localidadService.addLocalidadToCollectionIfMissing(
      this.localidadsSharedCollection,
      direccion.localidad
    );
  }

  protected loadRelationshipsOptions(): void {
    this.localidadService
      .query()
      .pipe(map((res: HttpResponse<ILocalidad[]>) => res.body ?? []))
      .pipe(
        map((localidads: ILocalidad[]) =>
          this.localidadService.addLocalidadToCollectionIfMissing(localidads, this.editForm.get('localidad')!.value)
        )
      )
      .subscribe((localidads: ILocalidad[]) => (this.localidadsSharedCollection = localidads));
  }

  protected createFromForm(): IDireccion {
    return {
      ...new Direccion(),
      id: this.editForm.get(['id'])!.value,
      calle: this.editForm.get(['calle'])!.value,
      numero: this.editForm.get(['numero'])!.value,
      localidad: this.editForm.get(['localidad'])!.value,
    };
  }
}
