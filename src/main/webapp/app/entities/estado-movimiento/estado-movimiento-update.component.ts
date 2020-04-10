import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoMovimiento, EstadoMovimiento } from 'app/shared/model/estado-movimiento.model';
import { EstadoMovimientoService } from 'app/entities/estado-movimiento/estado-movimiento.service';

@Component({
  selector: 'jhi-estado-movimiento-update',
  templateUrl: './estado-movimiento-update.component.html'
})
export class EstadoMovimientoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected estadoMovimientoService: EstadoMovimientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoMovimiento }) => {
      this.updateForm(estadoMovimiento);
    });
  }

  updateForm(estadoMovimiento: IEstadoMovimiento) {
    this.editForm.patchValue({
      id: estadoMovimiento.id,
      nombreEstado: estadoMovimiento.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoMovimiento = this.createFromForm();
    if (estadoMovimiento.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoMovimientoService.update(estadoMovimiento));
    } else {
      this.subscribeToSaveResponse(this.estadoMovimientoService.create(estadoMovimiento));
    }
  }

  private createFromForm(): IEstadoMovimiento {
    return {
      ...new EstadoMovimiento(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoMovimiento>>) {
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
