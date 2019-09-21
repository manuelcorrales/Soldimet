import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { ISucursal, Sucursal } from 'app/shared/model/sucursal.model';
import { SucursalService } from './sucursal.service';

@Component({
  selector: 'jhi-sucursal-update',
  templateUrl: './sucursal-update.component.html'
})
export class SucursalUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreSucursal: [null, [Validators.required]]
  });

  constructor(protected sucursalService: SucursalService, protected activatedRoute: ActivatedRoute, private fb: FormBuilder) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ sucursal }) => {
      this.updateForm(sucursal);
    });
  }

  updateForm(sucursal: ISucursal) {
    this.editForm.patchValue({
      id: sucursal.id,
      nombreSucursal: sucursal.nombreSucursal
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const sucursal = this.createFromForm();
    if (sucursal.id !== undefined) {
      this.subscribeToSaveResponse(this.sucursalService.update(sucursal));
    } else {
      this.subscribeToSaveResponse(this.sucursalService.create(sucursal));
    }
  }

  private createFromForm(): ISucursal {
    return {
      ...new Sucursal(),
      id: this.editForm.get(['id']).value,
      nombreSucursal: this.editForm.get(['nombreSucursal']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISucursal>>) {
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
