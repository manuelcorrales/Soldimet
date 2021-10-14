import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IDocumentationType, DocumentationType } from '../documentation-type.model';
import { DocumentationTypeService } from '../service/documentation-type.service';

@Component({
  selector: 'jhi-documentation-type-update',
  templateUrl: './documentation-type-update.component.html',
})
export class DocumentationTypeUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    documentName: [null, [Validators.required]],
  });

  constructor(
    protected documentationTypeService: DocumentationTypeService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ documentationType }) => {
      this.updateForm(documentationType);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const documentationType = this.createFromForm();
    if (documentationType.id !== undefined) {
      this.subscribeToSaveResponse(this.documentationTypeService.update(documentationType));
    } else {
      this.subscribeToSaveResponse(this.documentationTypeService.create(documentationType));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDocumentationType>>): void {
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

  protected updateForm(documentationType: IDocumentationType): void {
    this.editForm.patchValue({
      id: documentationType.id,
      documentName: documentationType.documentName,
    });
  }

  protected createFromForm(): IDocumentationType {
    return {
      ...new DocumentationType(),
      id: this.editForm.get(['id'])!.value,
      documentName: this.editForm.get(['documentName'])!.value,
    };
  }
}
