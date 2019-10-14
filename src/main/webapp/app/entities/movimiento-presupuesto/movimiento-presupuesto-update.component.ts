import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IMovimientoPresupuesto, MovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { MovimientoPresupuestoService } from './movimiento-presupuesto.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';
import { IMovimiento } from 'app/shared/model/movimiento.model';
import { MovimientoService } from 'app/entities/movimiento/movimiento.service';

@Component({
  selector: 'jhi-movimiento-presupuesto-update',
  templateUrl: './movimiento-presupuesto-update.component.html'
})
export class MovimientoPresupuestoUpdateComponent implements OnInit {
  isSaving: boolean;

  presupuestos: IPresupuesto[];

  movimientos: IMovimiento[];

  editForm = this.fb.group({
    id: [],
    presupuesto: [null, Validators.required],
    movimiento: [null, Validators.required]
  });

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected movimientoPresupuestoService: MovimientoPresupuestoService,
    protected presupuestoService: PresupuestoService,
    protected movimientoService: MovimientoService,
    protected activatedRoute: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.activatedRoute.data.subscribe(({ movimientoPresupuesto }) => {
      this.updateForm(movimientoPresupuesto);
    });
    this.presupuestoService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IPresupuesto[]>) => mayBeOk.ok),
        map((response: HttpResponse<IPresupuesto[]>) => response.body)
      )
      .subscribe((res: IPresupuesto[]) => (this.presupuestos = res), (res: HttpErrorResponse) => this.onError(res.message));
    this.movimientoService
      .query({ filter: 'movimientopresupuesto-is-null' })
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

  updateForm(movimientoPresupuesto: IMovimientoPresupuesto) {
    this.editForm.patchValue({
      id: movimientoPresupuesto.id,
      presupuesto: movimientoPresupuesto.presupuesto,
      movimiento: movimientoPresupuesto.movimiento
    });
  }

  previousState() {
    window.history.back();
  }

  save() {
    this.isSaving = true;
    const movimientoPresupuesto = this.createFromForm();
    if (movimientoPresupuesto.id !== undefined) {
      this.subscribeToSaveResponse(this.movimientoPresupuestoService.update(movimientoPresupuesto));
    } else {
      this.subscribeToSaveResponse(this.movimientoPresupuestoService.create(movimientoPresupuesto));
    }
  }

  private createFromForm(): IMovimientoPresupuesto {
    return {
      ...new MovimientoPresupuesto(),
      id: this.editForm.get(['id']).value,
      presupuesto: this.editForm.get(['presupuesto']).value,
      movimiento: this.editForm.get(['movimiento']).value
    };
  }

  protected subscribeToSaveResponse(result: Observable<HttpResponse<IMovimientoPresupuesto>>) {
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

  trackPresupuestoById(index: number, item: IPresupuesto) {
    return item.id;
  }

  trackMovimientoById(index: number, item: IMovimiento) {
    return item.id;
  }
}
