import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoPresupuesto, EstadoPresupuesto } from 'app/shared/model/estado-presupuesto.model';
import { EstadoPresupuestoService } from 'app/entities/estado-presupuesto/estado-presupuesto.service';

@Component({
  selector: 'jhi-estado-presupuesto-update',
  templateUrl: './estado-presupuesto-update.component.html'
})
export class EstadoPresupuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected estadoPresupuestoService: EstadoPresupuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoPresupuesto }) => {
      this.updateForm(estadoPresupuesto);
    });
  }

  updateForm(estadoPresupuesto: IEstadoPresupuesto) {
    this.editForm.patchValue({
      id: estadoPresupuesto.id,
      nombreEstado: estadoPresupuesto.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoPresupuesto = this.createFromForm();
    if (estadoPresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPresupuestoService.update(estadoPresupuesto));
    } else {
      this.subscribeToSaveResponse(this.estadoPresupuestoService.create(estadoPresupuesto));
    }
  }

  private createFromForm(): IEstadoPresupuesto {
    return {
      ...new EstadoPresupuesto(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPresupuesto>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
}
