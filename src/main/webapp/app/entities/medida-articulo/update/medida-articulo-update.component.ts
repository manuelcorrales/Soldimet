import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IMedidaArticulo, MedidaArticulo } from '../medida-articulo.model';
import { MedidaArticuloService } from '../service/medida-articulo.service';

@Component({
  selector: 'jhi-medida-articulo-update',
  templateUrl: './medida-articulo-update.component.html',
})
export class MedidaArticuloUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    medida: [],
  });

  constructor(
    protected medidaArticuloService: MedidaArticuloService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ medidaArticulo }) => {
      this.updateForm(medidaArticulo);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const medidaArticulo = this.createFromForm();
    if (medidaArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.medidaArticuloService.update(medidaArticulo));
    } else {
      this.subscribeToSaveResponse(this.medidaArticuloService.create(medidaArticulo));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedidaArticulo>>): void {
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

  protected updateForm(medidaArticulo: IMedidaArticulo): void {
    this.editForm.patchValue({
      id: medidaArticulo.id,
      medida: medidaArticulo.medida,
    });
  }

  protected createFromForm(): IMedidaArticulo {
    return {
      ...new MedidaArticulo(),
      id: this.editForm.get(['id'])!.value,
      medida: this.editForm.get(['medida'])!.value,
    };
  }
}
