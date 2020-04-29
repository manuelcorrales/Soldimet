import { Component, OnInit } from '@angular/core';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { HttpResponse, HttpErrorResponse } from '@angular/common/http';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { ActivatedRoute } from '@angular/router';
import { filter, map } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { IOperacion } from 'app/shared/model/operacion.model';
import { OperacionService } from './operacion.service';
// import { PresupuestosService } from 'app/presupuestos/presupuestos.service';

@Component({
  selector: 'jhi-operacion-update',
  templateUrl: './operacion-add-lista.component.html'
})
export class OperacionAddListasComponent implements OnInit {
  isSaving: boolean;

  operaciones: IOperacion[];
  operacion: IOperacion;

  constructor(
    protected jhiAlertService: JhiAlertService,
    protected operacionService: OperacionService,
    // protected tipoParteService: PresupuestosService,
    protected activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.isSaving = false;
    this.operacionService
      .query()
      .pipe(
        filter((mayBeOk: HttpResponse<IOperacion[]>) => mayBeOk.ok),
        map((response: HttpResponse<IOperacion[]>) => response.body)
      )
      .subscribe((res: IOperacion[]) => (this.operaciones = res), (res: HttpErrorResponse) => this.onError(res.message));
  }

  protected onError(errorMessage: string) {
    this.jhiAlertService.error(errorMessage, null, null);
    this.isSaving = false;
  }

  protected onSuccess(message: string) {
    this.jhiAlertService.success(message, null, null);
    this.isSaving = false;
  }

  save() {
    this.isSaving = true;
    this.operacionService.agregarALista(this.operacion).subscribe(
      res => {
        if (res) {
          this.onSuccess('Agregado a todas las listas');
        } else {
          this.onError('Error');
        }
      },
      (error: HttpErrorResponse) => this.onError(error.message)
    );
  }
}
