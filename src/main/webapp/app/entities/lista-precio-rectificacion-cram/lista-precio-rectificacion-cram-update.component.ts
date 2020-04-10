import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from 'app/shared/model/lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from 'app/entities/lista-precio-rectificacion-cram/lista-precio-rectificacion-cram.service';

@Component({
  selector: 'jhi-lista-precio-rectificacion-cram-update',
  templateUrl: './lista-precio-rectificacion-cram-update.component.html'
})
export class ListaPrecioRectificacionCRAMUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    numeroGrupo: [null, [Validators.required, Validators.min(1), Validators.max(25)]]
  });

  constructor(
    protected listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
      this.updateForm(listaPrecioRectificacionCRAM);
    });
  }

  updateForm(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM) {
    this.editForm.patchValue({
      id: listaPrecioRectificacionCRAM.id,
      numeroGrupo: listaPrecioRectificacionCRAM.numeroGrupo
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const listaPrecioRectificacionCRAM = this.createFromForm();
    if (listaPrecioRectificacionCRAM.id !== undefined) {
      this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.update(listaPrecioRectificacionCRAM));
    } else {
      this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.create(listaPrecioRectificacionCRAM));
    }
  }

  private createFromForm(): IListaPrecioRectificacionCRAM {
    return {
      ...new ListaPrecioRectificacionCRAM(),
      id: this.editForm.get(['id']).value,
      numeroGrupo: this.editForm.get(['numeroGrupo']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioRectificacionCRAM>>) {
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
