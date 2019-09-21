import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IDocumentationType, DocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from './documentation-type.service';

@Component({
  selector: 'jhi-documentation-type-update',
  templateUrl: './documentation-type-update.component.html'
})
export class DocumentationTypeUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    documentName: [null, [Validators.required]]
  });

  constructor(
    protected documentationTypeService: DocumentationTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ documentationType }) => {
      this.updateForm(documentationType);
    });
  }

  updateForm(documentationType: IDocumentationType) {
    this.editForm.patchValue({
      id: documentationType.id,
      documentName: documentationType.documentName
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const documentationType = this.createFromForm();
    if (documentationType.id !== undefined) {
      this.subscribeToSaveResponse(this.documentationTypeService.update(documentationType));
    } else {
      this.subscribeToSaveResponse(this.documentationTypeService.create(documentationType));
    }
  }

  private createFromForm(): IDocumentationType {
    return {
      ...new DocumentationType(),
      id: this.editForm.get(['id']).value,
      documentName: this.editForm.get(['documentName']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentationType>>) {
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
