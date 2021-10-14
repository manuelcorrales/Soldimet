import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from '../lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from '../service/lista-precio-desde-hasta.service';

@Component({
  selector: 'jhi-lista-precio-desde-hasta-update',
  templateUrl: './lista-precio-desde-hasta-update.component.html',
})
export class ListaPrecioDesdeHastaUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    fechaDesde: [null, [Validators.required]],
    fechaHasta: [],
  });

  constructor(
    protected listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ listaPrecioDesdeHasta }) => {
      this.updateForm(listaPrecioDesdeHasta);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const listaPrecioDesdeHasta = this.createFromForm();
    if (listaPrecioDesdeHasta.id !== undefined) {
      this.subscribeToSaveResponse(this.listaPrecioDesdeHastaService.update(listaPrecioDesdeHasta));
    } else {
      this.subscribeToSaveResponse(this.listaPrecioDesdeHastaService.create(listaPrecioDesdeHasta));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioDesdeHasta>>): void {
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

  protected updateForm(listaPrecioDesdeHasta: IListaPrecioDesdeHasta): void {
    this.editForm.patchValue({
      id: listaPrecioDesdeHasta.id,
      fechaDesde: listaPrecioDesdeHasta.fechaDesde,
      fechaHasta: listaPrecioDesdeHasta.fechaHasta,
    });
  }

  protected createFromForm(): IListaPrecioDesdeHasta {
    return {
      ...new ListaPrecioDesdeHasta(),
      id: this.editForm.get(['id'])!.value,
      fechaDesde: this.editForm.get(['fechaDesde'])!.value,
      fechaHasta: this.editForm.get(['fechaHasta'])!.value,
    };
  }
}
