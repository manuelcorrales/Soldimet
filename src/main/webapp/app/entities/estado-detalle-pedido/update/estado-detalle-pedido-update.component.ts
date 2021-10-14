import { Component, OnInit } from '@angular/core';
import { HttpResponse } from '@angular/common/http';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';

import { IEstadoDetallePedido, EstadoDetallePedido } from '../estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from '../service/estado-detalle-pedido.service';

@Component({
  selector: 'jhi-estado-detalle-pedido-update',
  templateUrl: './estado-detalle-pedido-update.component.html',
})
export class EstadoDetallePedidoUpdateComponent implements OnInit {
  isSaving = false;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]],
  });

  constructor(
    protected estadoDetallePedidoService: EstadoDetallePedidoService,
    protected activatedRoute: ActivatedRoute,
    protected fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.activatedRoute.data.subscribe(({ estadoDetallePedido }) => {
      this.updateForm(estadoDetallePedido);
    });
  }

  previousState(): void {
    window.history.back();
  }

  save(): void {
    this.isSaving = true;
    const estadoDetallePedido = this.createFromForm();
    if (estadoDetallePedido.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoDetallePedidoService.update(estadoDetallePedido));
    } else {
      this.subscribeToSaveResponse(this.estadoDetallePedidoService.create(estadoDetallePedido));
    }
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoDetallePedido>>): void {
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

  protected updateForm(estadoDetallePedido: IEstadoDetallePedido): void {
    this.editForm.patchValue({
      id: estadoDetallePedido.id,
      nombreEstado: estadoDetallePedido.nombreEstado,
    });
  }

  protected createFromForm(): IEstadoDetallePedido {
    return {
      ...new EstadoDetallePedido(),
      id: this.editForm.get(['id'])!.value,
      nombreEstado: this.editForm.get(['nombreEstado'])!.value,
    };
  }
}
