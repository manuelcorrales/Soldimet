import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IBanco, Banco } from 'app/shared/model/banco.model';
import { BancoService } from 'app/entities/banco/banco.service';

@Component({
  selector: 'jhi-banco-update',
  templateUrl: './banco-update.component.html'
})
export class BancoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreBanco: [null, [Validators.required]]
  });

  constructor(protected bancoService: BancoService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ banco }) => {
      this.updateForm(banco);
    });
  }

  updateForm(banco: IBanco) {
    this.editForm.patchValue({
      id: banco.id,
      nombreBanco: banco.nombreBanco
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const banco = this.createFromForm();
    if (banco.id !== undefined) {
      this.subscribeToSaveResponse(this.bancoService.update(banco));
    } else {
      this.subscribeToSaveResponse(this.bancoService.create(banco));
    }
  }

  private createFromForm(): IBanco {
    return {
      ...new Banco(),
      id: this.editForm.get(['id']).value,
      nombreBanco: this.editForm.get(['nombreBanco']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IBanco>>) {
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
