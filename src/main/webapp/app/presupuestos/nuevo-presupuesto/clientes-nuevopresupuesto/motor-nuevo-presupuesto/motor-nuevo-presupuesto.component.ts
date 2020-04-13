import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { Cilindrada } from 'app/shared/model/cilindrada.model';
import { Motor } from 'app/shared/model/motor.model';
import { Aplicacion } from 'app/shared/model/aplicacion.model';
import { TipoParteMotor } from 'app/shared/model/tipo-parte-motor.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';

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

  constructor(private _presupuestosService: PresupuestosService) {}

  ngOnInit() {
    this.motores = this._presupuestosService.buscarMotores();
    this.cilindradas = this._presupuestosService.buscarCilindradas();
    this.tiposPartesMotores = this._presupuestosService.buscarTiposPartes();
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
}
