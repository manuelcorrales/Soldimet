import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IProveedor, Proveedor } from '../proveedor.model';
import { ProveedorService } from '../service/proveedor.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';

@Component({
  selector: 'jhi-proveedor-update',
  templateUrl: './proveedor-update.component.html',
})
export class ProveedorUpdateComponent implements OnInit {
  isSaving = false;

  personasCollection: IPersona[] = [];

  editForm = this.fb.group({
    id: [],
    nombreProveedor: [null, [Validators.required]],
    persona: [null, Validators.required],
  });

  constructor(
    protected proveedorService: ProveedorService,
    protected personaService: PersonaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ proveedor }) => {
      this.updateForm(proveedor);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const proveedor = this.createFromForm();
    if (proveedor.id !== undefined) {
      this.subscribeToSaveResponse(this.proveedorService.update(proveedor));
    } else {
      this.subscribeToSaveResponse(this.proveedorService.create(proveedor));
    }
  }

  trackPersonaById(index: number, item: IPersona): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IProveedor>>): void {
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

  protected updateForm(proveedor: IProveedor): void {
    this.editForm.patchValue({
      id: proveedor.id,
      nombreProveedor: proveedor.nombreProveedor,
      persona: proveedor.persona,
    });

    this.personasCollection = this.personaService.addPersonaToCollectionIfMissing(this.personasCollection, proveedor.persona);
  }

  protected loadRelationshipsOptions(): void {
    this.personaService
      .query({ 'proveedorId.specified': 'false' })
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(
        map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing(personas, this.editForm.get('persona')!.value))
      )
      .subscribe((personas: IPersona[]) => (this.personasCollection = personas));
  }

  protected createFromForm(): IProveedor {
    return {
      ...new Proveedor(),
      id: this.editForm.get(['id'])!.value,
      nombreProveedor: this.editForm.get(['nombreProveedor'])!.value,
      persona: this.editForm.get(['persona'])!.value,
    };
  }
}
