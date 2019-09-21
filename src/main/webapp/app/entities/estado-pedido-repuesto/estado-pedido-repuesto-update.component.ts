import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { IEstadoPedidoRepuesto, EstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from './estado-pedido-repuesto.service';

@Component({
  selector: 'jhi-estado-pedido-repuesto-update',
  templateUrl: './estado-pedido-repuesto-update.component.html'
})
export class EstadoPedidoRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  editForm = this.fb.group({
    id: [],
    nombreEstado: [null, [Validators.required, Validators.minLength(3)]]
  });

  constructor(
    protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ estadoPedidoRepuesto }) => {
      this.updateForm(estadoPedidoRepuesto);
    });
  }

  updateForm(estadoPedidoRepuesto: IEstadoPedidoRepuesto) {
    this.editForm.patchValue({
      id: estadoPedidoRepuesto.id,
      nombreEstado: estadoPedidoRepuesto.nombreEstado
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const estadoPedidoRepuesto = this.createFromForm();
    if (estadoPedidoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.estadoPedidoRepuestoService.update(estadoPedidoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.estadoPedidoRepuestoService.create(estadoPedidoRepuesto));
    }
  }

  private createFromForm(): IEstadoPedidoRepuesto {
    return {
      ...new EstadoPedidoRepuesto(),
      id: this.editForm.get(['id']).value,
      nombreEstado: this.editForm.get(['nombreEstado']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IEstadoPedidoRepuesto>>) {
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
