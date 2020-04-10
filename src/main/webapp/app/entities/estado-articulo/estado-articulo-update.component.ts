import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoArticulo, EstadoArticulo } from 'app/shared/model/estado-articulo.model';
import { EstadoArticuloService } from 'app/entities/estado-articulo/estado-articulo.service';

@Component({
  selector: 'jhi-estado-articulo-update',
  templateUrl: './estado-articulo-update.component.html'
})
export class EstadoArticuloUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected estadoArticuloService: EstadoArticuloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
      this.updateForm(estadoArticulo);
    });
  }

  updateForm(estadoArticulo: IEstadoArticulo) {
    this.editForm.patchValue({
      id: estadoArticulo.id,
      nombreEstado: estadoArticulo.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoArticulo = this.createFromForm();
    if (estadoArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoArticuloService.update(estadoArticulo));
    } else {
      this.subscribeToSaveResponse(this.estadoArticuloService.create(estadoArticulo));
    }
  }

  private createFromForm(): IEstadoArticulo {
    return {
      ...new EstadoArticulo(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoArticulo>>) {
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
