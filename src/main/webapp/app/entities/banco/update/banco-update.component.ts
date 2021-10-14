import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IBanco, Banco } from '../banco.model';
import { BancoService } from '../service/banco.service';

@Component({
  selector: 'jhi-banco-update',
  templateUrl: './banco-update.component.html',
})
export class BancoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreBanco: [null, [Validators.required]],
  });

  constructor(protected bancoService: BancoService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ banco }) => {
      this.updateForm(banco);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const banco = this.createFromForm();
    if (banco.id !== undefined) {
      this.subscribeToSaveResponse(this.bancoService.update(banco));
    } else {
      this.subscribeToSaveResponse(this.bancoService.create(banco));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBanco>>): void {
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

  protected updateForm(banco: IBanco): void {
    this.editForm.patchValue({
      id: banco.id,
      nombreBanco: banco.nombreBanco,
    });
  }

  protected createFromForm(): IBanco {
    return {
      ...new Banco(),
      id: this.editForm.get(['id'])!.value,
      nombreBanco: this.editForm.get(['nombreBanco'])!.value,
    };
  }
}
