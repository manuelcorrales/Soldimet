import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { ISucursal, Sucursal } from '../sucursal.model';
import { SucursalService } from '../service/sucursal.service';

@Component({
  selector: 'jhi-sucursal-update',
  templateUrl: './sucursal-update.component.html',
})
export class SucursalUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreSucursal: [null, [Validators.required]],
  });

  constructor(protected sucursalService: SucursalService, protected activatedRoute: ActivatedRoute, protected fb: FormBuilder) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ sucursal }) => {
      this.updateForm(sucursal);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const sucursal = this.createFromForm();
    if (sucursal.id !== undefined) {
      this.subscribeToSaveResponse(this.sucursalService.update(sucursal));
    } else {
      this.subscribeToSaveResponse(this.sucursalService.create(sucursal));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<ISucursal>>): void {
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

  protected updateForm(sucursal: ISucursal): void {
    this.editForm.patchValue({
      id: sucursal.id,
      nombreSucursal: sucursal.nombreSucursal,
    });
  }

  protected createFromForm(): ISucursal {
    return {
      ...new Sucursal(),
      id: this.editForm.get(['id'])!.value,
      nombreSucursal: this.editForm.get(['nombreSucursal'])!.value,
    };
  }
}
