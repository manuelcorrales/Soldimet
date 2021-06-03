import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IMedidaArticulo, MedidaArticulo } from 'app/shared/model/medida-articulo.model';
import { MedidaArticuloService } from './medida-articulo.service';

@Component({
  selector: 'jhi-medida-articulo-update',
  templateUrl: './medida-articulo-update.component.html'
})
export class MedidaArticuloUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    medida: []
  });

  constructor(protected medidaArticuloService: MedidaArticuloService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ medidaArticulo }) => {
      this.updateForm(medidaArticulo);
    });
  }

  updateForm(medidaArticulo: IMedidaArticulo) {
    this.editForm.patchValue({
      id: medidaArticulo.id,
      medida: medidaArticulo.medida
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const medidaArticulo = this.createFromForm();
    if (medidaArticulo.id !== undefined) {
      this.subscribeToSaveResponse(this.medidaArticuloService.update(medidaArticulo));
    } else {
      this.subscribeToSaveResponse(this.medidaArticuloService.create(medidaArticulo));
    }
  }

  private createFromForm(): IMedidaArticulo {
    return {
      ...new MedidaArticulo(),
      id: this.editForm.get(['id']).value,
      medida: this.editForm.get(['medida']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMedidaArticulo>>) {
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
