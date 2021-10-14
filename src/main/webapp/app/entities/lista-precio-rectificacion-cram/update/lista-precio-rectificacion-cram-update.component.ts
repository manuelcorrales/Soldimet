import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IListaPrecioRectificacionCRAM, ListaPrecioRectificacionCRAM } from '../lista-precio-rectificacion-cram.model';
import { ListaPrecioRectificacionCRAMService } from '../service/lista-precio-rectificacion-cram.service';

@Component({
  selector: 'jhi-lista-precio-rectificacion-cram-update',
  templateUrl: './lista-precio-rectificacion-cram-update.component.html',
})
export class ListaPrecioRectificacionCRAMUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    numeroGrupo: [null, [Validators.required, Validators.min(1), Validators.max(25)]],
  });

  constructor(
    protected listaPrecioRectificacionCRAMService: ListaPrecioRectificacionCRAMService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ listaPrecioRectificacionCRAM }) => {
      this.updateForm(listaPrecioRectificacionCRAM);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const listaPrecioRectificacionCRAM = this.createFromForm();
    if (listaPrecioRectificacionCRAM.id !== undefined) {
      this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.update(listaPrecioRectificacionCRAM));
    } else {
      this.subscribeToSaveResponse(this.listaPrecioRectificacionCRAMService.create(listaPrecioRectificacionCRAM));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IListaPrecioRectificacionCRAM>>): void {
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

  protected updateForm(listaPrecioRectificacionCRAM: IListaPrecioRectificacionCRAM): void {
    this.editForm.patchValue({
      id: listaPrecioRectificacionCRAM.id,
      numeroGrupo: listaPrecioRectificacionCRAM.numeroGrupo,
    });
  }

  protected createFromForm(): IListaPrecioRectificacionCRAM {
    return {
      ...new ListaPrecioRectificacionCRAM(),
      id: this.editForm.get(['id'])!.value,
      numeroGrupo: this.editForm.get(['numeroGrupo'])!.value,
    };
  }
}
