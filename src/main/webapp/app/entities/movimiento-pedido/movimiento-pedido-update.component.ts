import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMovimientoPedido, MovimientoPedido } from 'app/shared/model/movimiento-pedido.model';
import { MovimientoPedidoService } from './movimiento-pedido.service';
import { IPedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from 'app/entities/pedido-repuesto/pedido-repuesto.service';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/movimiento.service';

@Component({
  selector: 'jhi-movimiento-pedido-update',
  templateUrl: './movimiento-pedido-update.component.html'
})
export class MovimientoPedidoUpdateComponent implements OnInit {
  isSaving: boolean;

  pedidorepuestos: IPedidoRepuesto[];

  movimientos: IMovimiento[];

  editForm = this.fb.group({
    id: [],
    pedidoRepuesto: [null, Validators.required],
    movimiento: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected movimientoPedidoService: MovimientoPedidoService,
    protected pedidoRepuestoService: PedidoRepuestoService,
    protected movimientoService: MovimientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ movimientoPedido }) => {
      this.updateForm(movimientoPedido);
    });
    this.pedidoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPedidoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPedidoRepuesto[]>) => response.body)
      )
      .subscribe((res: IPedidoRepuesto[]) => (this.pedidorepuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.movimientoService
      .query({ filter: 'movimientopedido-is-null' })
      .pipe(
        filter((mayBeOk: HttpResponse<IMovimiento[]>) => mayBeOk.ok),
        map((response: HttpResponse<IMovimiento[]>) => response.body)
      )
      .subscribe(
        (res: IMovimiento[]) => {
          if (!this.editForm.get('movimiento').value || !this.editForm.get('movimiento').value.id) {
            this.movimientos = res;
          } else {
            this.movimientoService
              .find(this.editForm.get('movimiento').value.id)
              .pipe(
                filter((subResMayBeOk: HttpResponse<IMovimiento>) => subResMayBeOk.ok),
                map((subResponse: HttpResponse<IMovimiento>) => subResponse.body)
              )
              .subscribe(
                (subRes: IMovimiento) => (this.movimientos = [subRes].concat(res)),
                (subRes: HttpErrorResponse) => this.onError(subRes.message)
              );
          }
        },
        (res: HttpErrorResponse) => this.onError(res.message)
      );
  }

  updateForm(movimientoPedido: IMovimientoPedido) {
    this.editForm.patchValue({
      id: movimientoPedido.id,
      pedidoRepuesto: movimientoPedido.pedidoRepuesto,
      movimiento: movimientoPedido.movimiento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const movimientoPedido = this.createFromForm();
    if (movimientoPedido.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoPedidoService.update(movimientoPedido));
    } else {
      this.subscribeToSaveResponse(this.movimientoPedidoService.create(movimientoPedido));
    }
  }

  private createFromForm(): IMovimientoPedido {
    return {
      ...new MovimientoPedido(),
      id: this.editForm.get(['id']).value,
      pedidoRepuesto: this.editForm.get(['pedidoRepuesto']).value,
      movimiento: this.editForm.get(['movimiento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoPedido>>) {
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

  trackPedidoRepuestoById(index: number, item: IPedidoRepuesto) {
    return item.id;
  }

  trackMovimientoById(index: number, item: IMovimiento) {
    return item.id;
  }
}
