import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IEmpleado, Empleado } from 'app/shared/model/empleado.model';
import { EmpleadoService } from 'app/entities/empleado/empleado.service';
import { IPersona } from 'app/shared/model/persona.model';
import { PersonaService } from 'app/entities/persona/persona.service';
import { ISucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from 'app/entities/sucursal/sucursal.service';

@Component({
  selector: 'jhi-empleado-update',
  templateUrl: './empleado-update.component.html'
})
export class EmpleadoUpdateComponent implements OnInit {
  isSaving: boolean;

  personas: IPersona[];

  sucursals: ISucursal[];

  editForm = this.fb.group({
    id: [],
    persona: [null, Validators.required],
    sucursal: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected empleadoService: EmpleadoService,
    protected personaService: PersonaService,
    protected sucursalService: SucursalService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ empleado }) => {
      this.updateForm(empleado);
    });
    this.personaService
      .query({ filter: 'empleado-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IPersona[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPersona[]>) => response.body)
      )
      .subscribe(
        (res: IPersona[]) => {
          if (!this.editForm.get('persona').value || !this.editForm.get('persona').value.id) {
            this.personas = res;
          } else {
            this.personaService
              .find(this.editForm.get('persona').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IPersona>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IPersona>) => subResponse.body)
              )
              .subscribe(
                (subRes: IPersona) => (this.personas = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.sucursalService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<ISucursal[]>) => mayBeOk.ok),
        map((response: HttpResponse<ISucursal[]>) => response.body)
      )
      .subscribe((res: ISucursal[]) => (this.sucursals = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(empleado: IEmpleado) {
    this.editForm.patchValue({
      id: empleado.id,
      persona: empleado.persona,
      sucursal: empleado.sucursal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const empleado = this.createFromForm();
    if (empleado.id !== undefined) {
      this.subscribeToSaveResponse(this.empleadoService.update(empleado));
    } else {
      this.subscribeToSaveResponse(this.empleadoService.create(empleado));
    }
  }

  private createFromForm(): IEmpleado {
    return {
      ...new Empleado(),
      id: this.editForm.get(['id']).value,
      persona: this.editForm.get(['persona']).value,
      sucursal: this.editForm.get(['sucursal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEmpleado>>) {
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

  trackPersonaById(index: number, item: IPersona) {
    return item.id;
  }

  trackSucursalById(index: number, item: ISucursal) {
    return item.id;
  }
}
