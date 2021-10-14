import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoArticulo, EstadoArticulo } from '../estado-articulo.model';
import { EstadoArticuloService } from '../service/estado-articulo.service';

@Component({
  selector: 'jhi-estado-articulo-update',
  templateUrl: './estado-articulo-update.component.html',
})
export class EstadoArticuloUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoArticuloService: EstadoArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoArticulo }) => {
      this.updateForm(estadoArticulo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoArticulo = this.createFromForm();
    if (estadoArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoArticuloService.update(estadoArticulo));
    } else {
      this.subscribeToSaveResponse(this.estadoArticuloService.create(estadoArticulo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoArticulo>>): void {
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

  protected updateForm(estadoArticulo: IEstadoArticulo): void {
    this.editForm.patchValue({
      id: estadoArticulo.id,
      nombreEstado: estadoArticulo.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoArticulo {
    return {
      ...new EstadoArticulo(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}
