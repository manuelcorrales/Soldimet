import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize, map } from 'rxjs/operators';

import { IPersona, Persona } from '../persona.model';
import { PersonaService } from '../service/persona.service';
import { IDireccion } from 'app/entities/direccion/direccion.model';
import { DireccionService } from 'app/entities/direccion/service/direccion.service';
import { IEstadoPersona } from 'app/entities/estado-persona/estado-persona.model';
import { EstadoPersonaService } from 'app/entities/estado-persona/service/estado-persona.service';
import { IUser } from 'app/entities/user/user.model';
import { UserService } from 'app/entities/user/user.service';

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html',
})
export class PersonaUpdateComponent implements OnInit {
  isSaving = false;

  direccionsCollection: IDireccion[] = [];
  estadoPersonasSharedCollection: IEstadoPersona[] = [];
  usersSharedCollection: IUser[] = [];

  editForm = this.fb.group({
    id: [],
    numeroTelefono: [],
    nombre: [null, [Validators.required]],
    apellido: [],
    direccion: [],
    estadoPersona: [],
    user: [],
  });

  constructor(
    protected personaService: PersonaService,
    protected direccionService: DireccionService,
    protected estadoPersonaService: EstadoPersonaService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);

      this.loadRelationshipsOptions();
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  trackDireccionById(index: number, item: IDireccion): number {
    return item.id!;
  }

  trackEstadoPersonaById(index: number, item: IEstadoPersona): number {
    return item.id!;
  }

  trackUserById(index: number, item: IUser): number {
    return item.id!;
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>): void {
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

  protected updateForm(persona: IPersona): void {
    this.editForm.patchValue({
      id: persona.id,
      numeroTelefono: persona.numeroTelefono,
      nombre: persona.nombre,
      apellido: persona.apellido,
      direccion: persona.direccion,
      estadoPersona: persona.estadoPersona,
      user: persona.user,
    });

    this.direccionsCollection = this.direccionService.addDireccionToCollectionIfMissing(this.direccionsCollection, persona.direccion);
    this.estadoPersonasSharedCollection = this.estadoPersonaService.addEstadoPersonaToCollectionIfMissing(
      this.estadoPersonasSharedCollection,
      persona.estadoPersona
    );
    this.usersSharedCollection = this.userService.addUserToCollectionIfMissing(this.usersSharedCollection, persona.user);
  }

  protected loadRelationshipsOptions(): void {
    this.direccionService
      .query({ filter: 'persona-is-null' })
      .pipe(map((res: HttpResponse<IDireccion[]>) => res.body ?? []))
      .pipe(
        map((direccions: IDireccion[]) =>
          this.direccionService.addDireccionToCollectionIfMissing(direccions, this.editForm.get('direccion')!.value)
        )
      )
      .subscribe((direccions: IDireccion[]) => (this.direccionsCollection = direccions));

    this.estadoPersonaService
      .query()
      .pipe(map((res: HttpResponse<IEstadoPersona[]>) => res.body ?? []))
      .pipe(
        map((estadoPersonas: IEstadoPersona[]) =>
          this.estadoPersonaService.addEstadoPersonaToCollectionIfMissing(estadoPersonas, this.editForm.get('estadoPersona')!.value)
        )
      )
      .subscribe((estadoPersonas: IEstadoPersona[]) => (this.estadoPersonasSharedCollection = estadoPersonas));

    this.userService
      .query()
      .pipe(map((res: HttpResponse<IUser[]>) => res.body ?? []))
      .pipe(map((users: IUser[]) => this.userService.addUserToCollectionIfMissing(users, this.editForm.get('user')!.value)))
      .subscribe((users: IUser[]) => (this.usersSharedCollection = users));
  }

  protected createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id'])!.value,
      numeroTelefono: this.editForm.get(['numeroTelefono'])!.value,
      nombre: this.editForm.get(['nombre'])!.value,
      apellido: this.editForm.get(['apellido'])!.value,
      direccion: this.editForm.get(['direccion'])!.value,
      estadoPersona: this.editForm.get(['estadoPersona'])!.value,
      user: this.editForm.get(['user'])!.value,
    };
  }
}
