import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IListaPrecioDesdeHasta, ListaPrecioDesdeHasta } from 'app/shared/model/lista-precio-desde-hasta.model';
import { ListaPrecioDesdeHastaService } from 'app/entities/lista-precio-desde-hasta/lista-precio-desde-hasta.service';

@Component({
  selector: 'jhi-lista-precio-desde-hasta-update',
  templateUrl: './lista-precio-desde-hasta-update.component.html'
})
export class ListaPrecioDesdeHastaUpdateComponent implements OnInit {
  isSaving: boolean;
  fechaDesdeDp: any;
  fechaHastaDp: any;

  editForm = this.fb.group({
    id: [],
    fechaDesde: [null, [Validators.required]],
    fechaHasta: []
  });

  constructor(
    protected listaPrecioDesdeHastaService: ListaPrecioDesdeHastaService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ listaPrecioDesdeHasta }) => {
      this.updateForm(listaPrecioDesdeHasta);
    });
  }

  updateForm(listaPrecioDesdeHasta: IListaPrecioDesdeHasta) {
    this.editForm.patchValue({
      id: listaPrecioDesdeHasta.id,
      fechaDesde: listaPrecioDesdeHasta.fechaDesde,
      fechaHasta: listaPrecioDesdeHasta.fechaHasta
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const listaPrecioDesdeHasta = this.createFromForm();
    if (listaPrecioDesdeHasta.id !== undefined) {
      this.subscribeToSaveResponse(this.listaPrecioDesdeHastaService.update(listaPrecioDesdeHasta));
    } else {
      this.subscribeToSaveResponse(this.listaPrecioDesdeHastaService.create(listaPrecioDesdeHasta));
    }
  }

  private createFromForm(): IListaPrecioDesdeHasta {
    return {
      ...new ListaPrecioDesdeHasta(),
      id: this.editForm.get(['id']).value,
      fechaDesde: this.editForm.get(['fechaDesde']).value,
      fechaHasta: this.editForm.get(['fechaHasta']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioDesdeHasta>>) {
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
