import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoDetallePedido, EstadoDetallePedido } from 'app/shared/model/estado-detalle-pedido.model';
import { EstadoDetallePedidoService } from './estado-detalle-pedido.service';

@Component({
  selector: 'jhi-estado-detalle-pedido-update',
  templateUrl: './estado-detalle-pedido-update.component.html'
})
export class EstadoDetallePedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected estadoDetallePedidoService: EstadoDetallePedidoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoDetallePedido }) => {
      this.updateForm(estadoDetallePedido);
    });
  }

  updateForm(estadoDetallePedido: IEstadoDetallePedido) {
    this.editForm.patchValue({
      id: estadoDetallePedido.id,
      nombreEstado: estadoDetallePedido.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoDetallePedido = this.createFromForm();
    if (estadoDetallePedido.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoDetallePedidoService.update(estadoDetallePedido));
    } else {
      this.subscribeToSaveResponse(this.estadoDetallePedidoService.create(estadoDetallePedido));
    }
  }

  private createFromForm(): IEstadoDetallePedido {
    return {
      ...new EstadoDetallePedido(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoDetallePedido>>) {
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
