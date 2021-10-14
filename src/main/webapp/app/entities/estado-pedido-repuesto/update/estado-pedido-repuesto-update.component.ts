import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoPedidoRepuesto, EstadoPedidoRepuesto } from '../estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from '../service/estado-pedido-repuesto.service';

@Component({
  selector: 'jhi-estado-pedido-repuesto-update',
  templateUrl: './estado-pedido-repuesto-update.component.html',
})
export class EstadoPedidoRepuestoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoPedidoRepuesto }) => {
      this.updateForm(estadoPedidoRepuesto);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoPedidoRepuesto = this.createFromForm();
    if (estadoPedidoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPedidoRepuestoService.update(estadoPedidoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.estadoPedidoRepuestoService.create(estadoPedidoRepuesto));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPedidoRepuesto>>): void {
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

  protected updateForm(estadoPedidoRepuesto: IEstadoPedidoRepuesto): void {
    this.editForm.patchValue({
      id: estadoPedidoRepuesto.id,
      nombreEstado: estadoPedidoRepuesto.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoPedidoRepuesto {
    return {
      ...new EstadoPedidoRepuesto(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}
