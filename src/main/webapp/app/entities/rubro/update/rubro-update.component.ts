import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IRubro, Rubro } from '../rubro.model';
import { RubroService } from '../service/rubro.service';

@Component({
  selector: 'jhi-rubro-update',
  templateUrl: './rubro-update.component.html',
})
export class RubroUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreRubro: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(protected rubroService: RubroService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ rubro }) => {
      this.updateForm(rubro);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const rubro = this.createFromForm();
    if (rubro.id !== undefined) {
      this.subscribeToSaveResponse(this.rubroService.update(rubro));
    } else {
      this.subscribeToSaveResponse(this.rubroService.create(rubro));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRubro>>): void {
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

  protected updateForm(rubro: IRubro): void {
    this.editForm.patchValue({
      id: rubro.id,
      nombreRubro: rubro.nombreRubro,
    });
  }

  protected createFromForm(): IRubro {
    return {
      ...new Rubro(),
      id: this.editForm.get(['id'])!.value,
      nombreRubro: this.editForm.get(['nombreRubro'])!.value,
    };
  }
}
