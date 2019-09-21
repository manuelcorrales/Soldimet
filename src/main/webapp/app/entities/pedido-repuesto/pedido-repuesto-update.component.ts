import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IPedidoRepuesto, PedidoRepuesto } from 'app/shared/model/pedido-repuesto.model';
import { PedidoRepuestoService } from './pedido-repuesto.service';
import { IEstadoPedidoRepuesto } from 'app/shared/model/estado-pedido-repuesto.model';
import { EstadoPedidoRepuestoService } from 'app/entities/estado-pedido-repuesto/estado-pedido-repuesto.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';
import { IDocumentationType } from 'app/shared/model/documentation-type.model';
import { DocumentationTypeService } from 'app/entities/documentation-type/documentation-type.service';

@Component({
  selector: 'jhi-pedido-repuesto-update',
  templateUrl: './pedido-repuesto-update.component.html'
})
export class PedidoRepuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  estadopedidorepuestos: IEstadoPedidoRepuesto[];

  presupuestos: IPresupuesto[];

  documentationtypes: IDocumentationType[];
  fechaCreacionDp: any;
  fechaPedidoDp: any;
  fechaReciboDp: any;

  editForm = this.fb.group({
    id: [],
    fechaCreacion: [null, [Validators.required]],
    fechaPedido: [],
    fechaRecibo: [],
    estadoPedidoRepuesto: [null, Validators.required],
    presupuesto: [null, Validators.required],
    documentType: []
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected pedidoRepuestoService: PedidoRepuestoService,
    protected estadoPedidoRepuestoService: EstadoPedidoRepuestoService,
    protected presupuestoService: PresupuestoService,
    protected documentationTypeService: DocumentationTypeService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ pedidoRepuesto }) => {
      this.updateForm(pedidoRepuesto);
    });
    this.estadoPedidoRepuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IEstadoPedidoRepuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IEstadoPedidoRepuesto[]>) => response.body)
      )
      .subscribe(
        (res: IEstadoPedidoRepuesto[]) => (this.estadopedidorepuestos = res),
        (res: HttpErrorResponse) => this.onError(res.message)
      );
    this.presupuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPresupuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPresupuesto[]>) => response.body)
      )
      .subscribe((res: IPresupuesto[]) => (this.presupuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.documentationTypeService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IDocumentationType[]>) => mayBeOk.ok),
        map((response: HttpResponse<IDocumentationType[]>) => response.body)
      )
      .subscribe((res: IDocumentationType[]) => (this.documentationtypes = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  updateForm(pedidoRepuesto: IPedidoRepuesto) {
    this.editForm.patchValue({
      id: pedidoRepuesto.id,
      fechaCreacion: pedidoRepuesto.fechaCreacion,
      fechaPedido: pedidoRepuesto.fechaPedido,
      fechaRecibo: pedidoRepuesto.fechaRecibo,
      estadoPedidoRepuesto: pedidoRepuesto.estadoPedidoRepuesto,
      presupuesto: pedidoRepuesto.presupuesto,
      documentType: pedidoRepuesto.documentType
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const pedidoRepuesto = this.createFromForm();
    if (pedidoRepuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.pedidoRepuestoService.update(pedidoRepuesto));
    } else {
      this.subscribeToSaveResponse(this.pedidoRepuestoService.create(pedidoRepuesto));
    }
  }

  private createFromForm(): IPedidoRepuesto {
    return {
      ...new PedidoRepuesto(),
      id: this.editForm.get(['id']).value,
      fechaCreacion: this.editForm.get(['fechaCreacion']).value,
      fechaPedido: this.editForm.get(['fechaPedido']).value,
      fechaRecibo: this.editForm.get(['fechaRecibo']).value,
      estadoPedidoRepuesto: this.editForm.get(['estadoPedidoRepuesto']).value,
      presupuesto: this.editForm.get(['presupuesto']).value,
      documentType: this.editForm.get(['documentType']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IPedidoRepuesto>>) {
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

  trackEstadoPedidoRepuestoById(index: number, item: IEstadoPedidoRepuesto) {
    return item.id;
  }

  trackPresupuestoById(index: number, item: IPresupuesto) {
    return item.id;
  }

  trackDocumentationTypeById(index: number, item: IDocumentationType) {
    return item.id;
  }
}
