import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ICilindrada, Cilindrada } from 'app/shared/model/cilindrada.model';
import { CilindradaService } from 'app/entities/cilindrada/cilindrada.service';

@Component({
  selector: 'jhi-cilindrada-update',
  templateUrl: './cilindrada-update.component.html'
})
export class CilindradaUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    cantidadDeCilindros: [null, [Validators.required, Validators.min(1), Validators.max(20)]]
  });

  constructor(protected cilindradaService: CilindradaService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ cilindrada }) => {
      this.updateForm(cilindrada);
    });
  }

  updateForm(cilindrada: ICilindrada) {
    this.editForm.patchValue({
      id: cilindrada.id,
      cantidadDeCilindros: cilindrada.cantidadDeCilindros
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const cilindrada = this.createFromForm();
    if (cilindrada.id !== undefined) {
      this.subscribeToSaveResponse(this.cilindradaService.update(cilindrada));
    } else {
      this.subscribeToSaveResponse(this.cilindradaService.create(cilindrada));
    }
  }

  private createFromForm(): ICilindrada {
    return {
      ...new Cilindrada(),
      id: this.editForm.get(['id']).value,
      cantidadDeCilindros: this.editForm.get(['cantidadDeCilindros']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ICilindrada>>) {
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
