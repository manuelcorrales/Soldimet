import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoCobranzaOperacion, EstadoCobranzaOperacion } from 'app/shared/model/estado-cobranza-operacion.model';
import { EstadoCobranzaOperacionService } from './estado-cobranza-operacion.service';

@Component({
  selector: 'jhi-estado-cobranza-operacion-update',
  templateUrl: './estado-cobranza-operacion-update.component.html'
})
export class EstadoCobranzaOperacionUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected estadoCobranzaOperacionService: EstadoCobranzaOperacionService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoCobranzaOperacion }) => {
      this.updateForm(estadoCobranzaOperacion);
    });
  }

  updateForm(estadoCobranzaOperacion: IEstadoCobranzaOperacion) {
    this.editForm.patchValue({
      id: estadoCobranzaOperacion.id,
      nombreEstado: estadoCobranzaOperacion.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoCobranzaOperacion = this.createFromForm();
    if (estadoCobranzaOperacion.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoCobranzaOperacionService.update(estadoCobranzaOperacion));
    } else {
      this.subscribeToSaveResponse(this.estadoCobranzaOperacionService.create(estadoCobranzaOperacion));
    }
  }

  private createFromForm(): IEstadoCobranzaOperacion {
    return {
      ...new EstadoCobranzaOperacion(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoCobranzaOperacion>>) {
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
