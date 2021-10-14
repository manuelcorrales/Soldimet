import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IEmpleado, Empleado } from '../empleado.model';
import { EmpleadoService } from '../service/empleado.service';
import { IPersona } from 'app/entities/persona/persona.model';
import { PersonaService } from 'app/entities/persona/service/persona.service';
import { ISucursal } from 'app/entities/sucursal/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/service/sucursal.service';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html',
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving = false;

  personasCollection: IPersona[] = [];
  sucursalsSharedCollection: ISucursal[] = [];

  editForm = this.fb.group({
    id: [],
    persona: [null, Validators.required],
    sucursal: [],
  });

  constructor(
    protected empleadoService: EmpleadoService,
    protected personaService: PersonaService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  trackPersonaById(index: number, item: IPersona): number {
    return item.id!;
  }

  trackSucursalById(index: number, item: ISucursal): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>): void {
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

  protected updateForm(empleado: IEmpleado): void {
    this.editForm.patchValue({
      id: empleado.id,
      persona: empleado.persona,
      sucursal: empleado.sucursal,
    });

    this.personasCollection = this.personaService.addPersonaToCollectionIfMissing(this.personasCollection, empleado.persona);
    this.sucursalsSharedCollection = this.sucursalService.addSucursalToCollectionIfMissing(
      this.sucursalsSharedCollection,
      empleado.sucursal
    );
  }

  protected loadRelationshipsOptions(): void {
    this.personaService
      .query({ 'empleadoId.specified': 'false' })
      .pipe(map((res: HttpResponse<IPersona[]>) => res.body ?? []))
      .pipe(
        map((personas: IPersona[]) => this.personaService.addPersonaToCollectionIfMissing(personas, this.editForm.get('persona')!.value))
      )
      .subscribe((personas: IPersona[]) => (this.personasCollection = personas));

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

  protected createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id'])!.value,
      persona: this.editForm.get(['persona'])!.value,
      sucursal: this.editForm.get(['sucursal'])!.value,
    };
  }
}
