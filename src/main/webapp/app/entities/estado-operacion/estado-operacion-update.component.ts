import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoOperacion, EstadoOperacion } from 'app/shared/model/estado-operacion.model';
import { EstadoOperacionService } from 'app/entities/estado-operacion/estado-operacion.service';

@Component({
  selector: 'jhi-estado-operacion-update',
  templateUrl: './estado-operacion-update.component.html'
})
export class EstadoOperacionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected estadoOperacionService: EstadoOperacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoOperacion }) => {
      this.updateForm(estadoOperacion);
    });
  }

  updateForm(estadoOperacion: IEstadoOperacion) {
    this.editForm.patchValue({
      id: estadoOperacion.id,
      nombreEstado: estadoOperacion.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoOperacion = this.createFromForm();
    if (estadoOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoOperacionService.update(estadoOperacion));
    } else {
      this.subscribeToSaveResponse(this.estadoOperacionService.create(estadoOperacion));
    }
  }

  private createFromForm(): IEstadoOperacion {
    return {
      ...new EstadoOperacion(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoOperacion>>) {
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
