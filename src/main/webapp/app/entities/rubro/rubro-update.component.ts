import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IRubro, Rubro } from 'app/shared/model/rubro.model';
import { RubroService } from 'app/entities/rubro/rubro.service';

@Component({
  selector: 'jhi-rubro-update',
  templateUrl: './rubro-update.component.html'
})
export class RubroUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreRubro: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(protected rubroService: RubroService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ rubro }) => {
      this.updateForm(rubro);
    });
  }

  updateForm(rubro: IRubro) {
    this.editForm.patchValue({
      id: rubro.id,
      nombreRubro: rubro.nombreRubro
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const rubro = this.createFromForm();
    if (rubro.id !== undefined) {
      this.subscribeToSaveResponse(this.rubroService.update(rubro));
    } else {
      this.subscribeToSaveResponse(this.rubroService.create(rubro));
    }
  }

  private createFromForm(): IRubro {
    return {
      ...new Rubro(),
      id: this.editForm.get(['id']).value,
      nombreRubro: this.editForm.get(['nombreRubro']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IRubro>>) {
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
