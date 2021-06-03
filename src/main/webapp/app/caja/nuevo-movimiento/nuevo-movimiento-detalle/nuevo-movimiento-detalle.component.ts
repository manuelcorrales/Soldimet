import { MovimientoPresupuestoService } from 'app/entities/movimiento-presupuesto/movimiento-presupuesto.service';
import { IPresupuesto } from 'app/shared/model/presupuesto.model';
import { Page } from 'app/dto/page/page';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { JhiAlertService } from 'ng-jhipster';
import { PresupuestoService } from 'app/entities/presupuesto/presupuesto.service';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { DtoPresupuestoCabeceraComponent } from 'app/dto/dto-presupuesto-cabecera/dto-presupuesto-cabecera.component';
import { Subject, Observable, of } from 'rxjs';
import { MovimientoPresupuesto, IMovimientoPresupuesto } from 'app/shared/model/movimiento-presupuesto.model';
import { CostoRepuesto } from 'app/shared/model/costo-repuesto.model';
import { HttpErrorResponse, HttpResponse } from '@angular/common/http';

@Component({
  selector: 'jhi-nuevo-movimiento-detalle',
  templateUrl: './nuevo-movimiento-detalle.component.html',
  styleUrls: ['./nuevo-movimiento-detalle.component.scss']
})
export class NuevoMovimientoDetalleComponent implements OnInit {
  isPresupuesto = false;
  @ViewChild('instanceNTAPresup', { static: false })
  instancePresup: NgbTypeahead;

  presupuesto: DtoPresupuestoCabeceraComponent;
  movimientoPresupuesto: MovimientoPresupuesto;
  costoRepuestos: CostoRepuesto[];

  focusPresup$ = new Subject<string>();
  clickPresup$ = new Subject<string>();
  searchingPresupuesto = false;
  searchFailed = false;
  noResults = false;

  constructor(
    private jhiAlertService: JhiAlertService,
    private _presupuestosService: PresupuestosService,
    private presupuestoService: PresupuestoService,
    private movimientoPresupuestoService: MovimientoPresupuestoService
  ) {}

  ngOnInit() {
    this.movimientoPresupuesto = new MovimientoPresupuesto();
  }

  seleccionarPresupuesto(event: NgbTypeaheadSelectItemEvent) {
    this.presupuesto = event.item;
    this._presupuestosService.findCostoRepuestoPresupuesto(this.presupuesto.codigo).subscribe(
      (costoRepuestos: CostoRepuesto[]) => {
        this.costoRepuestos = costoRepuestos;
      },
      (res: HttpErrorResponse) => this.jhiAlertService.error(res.message)
    );
  }

  agregarRepuestoADetalle(costoRepuesto: CostoRepuesto) {
    if (!this.movimientoPresupuesto.costoRepuestos) {
      this.movimientoPresupuesto.costoRepuestos = [];
    }
    this.movimientoPresupuesto.costoRepuestos.push(costoRepuesto);
  }

  formatterPresup = (result: DtoPresupuestoCabeceraComponent) => {
    return result.isSoldadura ? `${result.cliente} - Soldadura` : `${result.codigo} - ${result.cliente} - ${result.motor}`;
  };

  searchPresup = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(400),
      distinctUntilChanged(),
      tap(() => (this.searchingPresupuesto = true)),
      switchMap(term => {
        if (term === '') {
          this.presupuesto = null;
          this.noResults = false;
          return of([]);
        }
        return this._presupuestosService.findByFilteredPage(term).pipe(
          tap(() => (this.searchFailed = false)),
          map((response: Page<DtoPresupuestoCabeceraComponent>) => {
            this.noResults = response.content.length === 0;
            return response.content;
          }),
          catchError(() => {
            this.noResults = false;
            this.searchFailed = true;
            return of([]);
          })
        );
      }),
      tap(() => (this.searchingPresupuesto = false))
    );

  async saveDetalle(): Promise<HttpResponse<IMovimientoPresupuesto>> {
    if (this.presupuesto) {
      const response: HttpResponse<IPresupuesto> = await this.presupuestoService.find(this.presupuesto.codigo).toPromise();
      this.movimientoPresupuesto.presupuesto = response.body;
      if (!response.ok) {
        return response;
      }
      return this._saveMovimientoPresupuesto();
    }
  }

  _saveMovimientoPresupuesto(): Promise<HttpResponse<IMovimientoPresupuesto>> {
    if (this.movimientoPresupuesto.id !== undefined) {
      return this.movimientoPresupuestoService.update(this.movimientoPresupuesto).toPromise();
    } else {
      return this.movimientoPresupuestoService.create(this.movimientoPresupuesto).toPromise();
    }
  }
}
