import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoCostoRepuesto, EstadoCostoRepuesto } from 'app/shared/model/estado-costo-repuesto.model';
import { EstadoCostoRepuestoService } from './estado-costo-repuesto.service';

@Component({
  selector: 'jhi-estado-costo-repuesto-update',
  templateUrl: './estado-costo-repuesto-update.component.html'
})
export class EstadoCostoRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required]]
  });

  constructor(
    protected estadoCostoRepuestoService: EstadoCostoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoCostoRepuesto }) => {
      this.updateForm(estadoCostoRepuesto);
    });
  }

  updateForm(estadoCostoRepuesto: IEstadoCostoRepuesto) {
    this.editForm.patchValue({
      id: estadoCostoRepuesto.id,
      nombreEstado: estadoCostoRepuesto.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoCostoRepuesto = this.createFromForm();
    if (estadoCostoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoCostoRepuestoService.update(estadoCostoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.estadoCostoRepuestoService.create(estadoCostoRepuesto));
    }
  }

  private createFromForm(): IEstadoCostoRepuesto {
    return {
      ...new EstadoCostoRepuesto(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoCostoRepuesto>>) {
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
