import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPersona, Persona } from 'app/shared/model/persona.model';
import { PersonaService } from './persona.service';
import { IDireccion } from 'app/shared/model/direccion.model';
import { DireccionService } from 'app/entities/direccion/direccion.service';
import { IEstadoPersona } from 'app/shared/model/estado-persona.model';
import { EstadoPersonaService } from 'app/entities/estado-persona/estado-persona.service';
import { IUser } from 'app/core/user/user.model';
import { UserService } from 'app/core/user/user.service';

@Component({
  selector: 'jhi-persona-update',
  templateUrl: './persona-update.component.html'
})
export class PersonaUpdateComponent implements OnInit {
  isSaving: boolean;

  direccions: IDireccion[];

  estadopersonas: IEstadoPersona[];

  users: IUser[];

  editForm = this.fb.group({
    id: [],
    nombre: [null, [Validators.required, Validators.minLength(3)]],
    numeroTelefono: [null, [Validators.required, Validators.minLength(5)]],
    direccion: [null, Validators.required],
    estadoPersona: [null, Validators.required],
    user: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected personaService: PersonaService,
    protected direccionService: DireccionService,
    protected estadoPersonaService: EstadoPersonaService,
    protected userService: UserService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ persona }) => {
      this.updateForm(persona);
    });
    this.direccionService
      .query({ 'personaId.specified': 'false' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDireccion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDireccion[]>) => response.body)
      )
      .subscribe(
        (res: IDireccion[]) => {
          if (!this.editForm.get('direccion').value || !this.editForm.get('direccion').value.id) {
            this.direccions = res;
          } else {
            this.direccionService
              .find(this.editForm.get('direccion').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDireccion>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDireccion>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDireccion) => (this.direccions = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.estadoPersonaService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoPersona[]>) => response.body)
      )
      .subscribe((res: IEstadoPersona[]) => (this.estadopersonas = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.userService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IUser[]>) => mayBeOk.ok),
        map((response: HttpResponse<IUser[]>) => response.body)
      )
      .subscribe((res: IUser[]) => (this.users = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(persona: IPersona) {
    this.editForm.patchValue({
      id: persona.id,
      nombre: persona.nombre,
      numeroTelefono: persona.numeroTelefono,
      direccion: persona.direccion,
      estadoPersona: persona.estadoPersona,
      user: persona.user
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const persona = this.createFromForm();
    if (persona.id !== undefined) {
      this.subscribeToSaveResponse(this.personaService.update(persona));
    } else {
      this.subscribeToSaveResponse(this.personaService.create(persona));
    }
  }

  private createFromForm(): IPersona {
    return {
      ...new Persona(),
      id: this.editForm.get(['id']).value,
      nombre: this.editForm.get(['nombre']).value,
      numeroTelefono: this.editForm.get(['numeroTelefono']).value,
      direccion: this.editForm.get(['direccion']).value,
      estadoPersona: this.editForm.get(['estadoPersona']).value,
      user: this.editForm.get(['user']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPersona>>) {
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

  trackDireccionById(index: number, item: IDireccion) {
    return item.id;
  }

  trackEstadoPersonaById(index: number, item: IEstadoPersona) {
    return item.id;
  }

  trackUserById(index: number, item: IUser) {
    return item.id;
  }
}
