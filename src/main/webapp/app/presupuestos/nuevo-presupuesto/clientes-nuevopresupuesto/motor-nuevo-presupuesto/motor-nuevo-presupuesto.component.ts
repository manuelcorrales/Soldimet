import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { Motor } from 'app/shared/model/motor.model';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { Observable, Subject, of } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap, switchMap, map, catchError } from 'rxjs/operators';
import { NgbTypeahead, NgbTypeaheadSelectItemEvent } from '@ng-bootstrap/ng-bootstrap';
import { Page } from '../../../../dto/page/page';

@Component({
  selector: 'jhi-motor-nuevo-presupuesto',
  templateUrl: './motor-nuevo-presupuesto.component.html',
  styles: []
})
export class MotorNuevoPresupuestoComponent implements OnInit {
  cilindradas: Cilindrada[] = [];
  motores: Motor[] = [];
  aplicaciones: Aplicacion[];
  tiposPartesMotores: TipoParteMotor[] = [];
  isSoldadura = false;

  motor: Motor;
  aplicacion: Aplicacion;
  cilindradaElegida: Cilindrada;
  detalleCreado = false;

  @Output() eventoDetallePresupuesto = new EventEmitter<DetallePresupuesto>();
  @Output() eventoIsSoldadura = new EventEmitter<boolean>();

  @ViewChild('instanceNTAAplicacion', { static: false })
  instanceAplicacion: NgbTypeahead;
  focusAplicacion$ = new Subject<string>();
  clickAplicacion$ = new Subject<string>();
  searchingAplicacion = false;
  searchFailed = false;
  buscado = false;

  @ViewChild('inputAplicacion', { static: false })
  aplicacionSelect: Array<any>;

  @ViewChild('inputMotor', { static: false })
  motorSelect: Array<any>;

  constructor(private _presupuestosService: PresupuestosService) {}

  ngOnInit() {
    this.motores = this._presupuestosService.buscarMotores();
    this.cilindradas = this._presupuestosService.buscarCilindradas();
    this._presupuestosService.buscarTiposPartes().subscribe(tipos => (this.tiposPartesMotores = tipos));
  }

  buscarAplicaciones() {
    this._presupuestosService.findAplicacionesPorMotor(this.motor).subscribe(datos => {
      this.aplicaciones = datos;
    });
  }

  crearDetalle(tipoParteMotor: TipoParteMotor, valor: boolean) {
    this.detalleCreado = true;
    const detallePresupuesto = new DetallePresupuesto();
    detallePresupuesto.tipoParteMotor = tipoParteMotor;
    detallePresupuesto.motor = this.motor;
    detallePresupuesto.cilindrada = this.cilindradaElegida;
    detallePresupuesto.aplicacion = this.aplicacion;
    this.eventoDetallePresupuesto.emit(detallePresupuesto);
  }

  soloSoldadura(valor: boolean) {
    // Si marca que es presupuestar soldadura, debo blockear todo lo demas
    this.isSoldadura = valor;
    this.eventoIsSoldadura.emit(valor);
  }

  formatterAplicacion = (result: Aplicacion) => {
    return `${result.motor.marcaMotor} - ${result.nombreAplicacion}`;
  };

  searchAplicacion = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(700),
      distinctUntilChanged(),
      tap(() => (this.searchingAplicacion = true)),
      switchMap(term => {
        if (term === '') {
          this.aplicacion = null;
          this.buscado = false;
          return of([]);
        }
        return this._presupuestosService.findByFilteredPageAplicaciones(term).pipe(
          tap(() => (this.searchFailed = false)),
          tap(() => (this.buscado = true)),
          map((response: Page<Aplicacion>) => {
            return response.content;
          }),
          catchError(() => {
            this.searchFailed = true;
            return of([]);
          })
        );
      }),
      tap(() => (this.searchingAplicacion = false))
    );

  seleccionarAplicacion(event: NgbTypeaheadSelectItemEvent) {
    // setTimeout(() => {
    this.aplicacion = event.item;
    this.motor = this.aplicacion.motor;
    // }, 500);
  }
}
