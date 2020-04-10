import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IDetallePedido, DetallePedido } from 'app/shared/model/detalle-pedido.model';
import { DetallePedidoService } from 'app/entities/detalle-pedido/detalle-pedido.service';
import { IDetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { DetallePresupuestoService } from 'app/entities/detalle-presupuesto/detalle-presupuesto.service';

@Component({
  selector: 'jhi-detalle-pedido-update',
  templateUrl: './detalle-pedido-update.component.html'
})
export class DetallePedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  detallepresupuestos: IDetallePresupuesto[];

  editForm = this.fb.group({
    id: [],
    detallePresupuesto: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected detallePedidoService: DetallePedidoService,
    protected detallePresupuestoService: DetallePresupuestoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ detallePedido }) => {
      this.updateForm(detallePedido);
    });
    this.detallePresupuestoService
      .query({ filter: 'detallepedido-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IDetallePresupuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDetallePresupuesto[]>) => response.body)
      )
      .subscribe(
        (res: IDetallePresupuesto[]) => {
          if (!this.editForm.get('detallePresupuesto').value || !this.editForm.get('detallePresupuesto').value.id) {
            this.detallepresupuestos = res;
          } else {
            this.detallePresupuestoService
              .find(this.editForm.get('detallePresupuesto').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IDetallePresupuesto>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IDetallePresupuesto>) => subResponse.body)
              )
              .subscribe(
                (subRes: IDetallePresupuesto) => (this.detallepresupuestos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(detallePedido: IDetallePedido) {
    this.editForm.patchValue({
      id: detallePedido.id,
      detallePresupuesto: detallePedido.detallePresupuesto
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const detallePedido = this.createFromForm();
    if (detallePedido.id !== undefined) {
      this.subscribeToSaveResponse(this.detallePedidoService.update(detallePedido));
    } else {
      this.subscribeToSaveResponse(this.detallePedidoService.create(detallePedido));
    }
  }

  private createFromForm(): IDetallePedido {
    return {
      ...new DetallePedido(),
      id: this.editForm.get(['id']).value,
      detallePresupuesto: this.editForm.get(['detallePresupuesto']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IDetallePedido>>) {
    result.subscribe(() => this.onSaveSuccess(), () => this.onSaveError());
  }

  protected onSaveSuccess() {
    this.isSaving = false;
    this.previousState();
  }

  protected onSaveError() {
    this.isSaving = false;
  }
  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
  }

  trackDetallePresupuestoById(index: number, item: IDetallePresupuesto) {
    return item.id;
  }
}
