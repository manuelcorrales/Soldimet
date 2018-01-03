import { Component, OnInit } from '@angular/core';
import {TipoRepuestoService} from "../../entities/tipo-repuesto/tipo-repuesto.service";
import {MotorService} from "../../entities/motor/motor.service";
import {AplicacionService} from "../../entities/aplicacion/aplicacion.service";
import {OperacionService} from "../../entities/operacion/operacion.service";
import {ArticuloService} from "../../entities/articulo/articulo.service";
import {CilindradaService} from "../../entities/cilindrada/cilindrada.service";
import {ClienteService} from "../../entities/cliente/cliente.service";
import {CostoOperacionService} from "../../entities/costo-operacion/costo-operacion.service";
import {MarcaService} from "../../entities/marca/marca.service";
import {PresupuestoService} from "../../entities/presupuesto/presupuesto.service";
import {TipoParteMotorService} from "../../entities/tipo-parte-motor/tipo-parte-motor.service";
import {TipoRepuesto} from "../../entities/tipo-repuesto/tipo-repuesto.model";
import {Motor} from "../../entities/motor/motor.model";
import {Aplicacion} from "../../entities/aplicacion/aplicacion.model";
import {TipoParteMotor} from "../../entities/tipo-parte-motor/tipo-parte-motor.model";
import {Observable} from "rxjs/Observable";

@Component({
  selector: 'jhi-nuevo-presupuesto',
  templateUrl: './nuevo-presupuesto.component.html',
  styles: []
})
export class NuevoPresupuestoComponent implements OnInit {

    tipoRepuesto: TipoRepuesto;
    motor: Motor;
    aplicacion: Aplicacion;
    tipoParteMotor: TipoParteMotor;

  constructor(private _tipoRepuestoService: TipoRepuestoService,
              private _motorService: MotorService,
              private _aplicacionService: AplicacionService,
              private _operacionesService: OperacionService,
              private _articuloService: ArticuloService,
              private _cilindradaService: CilindradaService,
              private _clienteService: ClienteService,
              private _costoOperacion: CostoOperacionService,
              private _marcaService: MarcaService,
              private _presupuestoService: PresupuestoService,
              private _tipoParteMotor: TipoParteMotorService) { }

  ngOnInit() {
      this._motorService.find(null).toPromise().then(
          (motoresRecibidos)=>{
              this.motor = motoresRecibidos;
          }
      ).catch();
      this._aplicacionService.find(null).toPromise().then(
          (aplicacionesRecibidas)=>{
              this.aplicacion = aplicacionesRecibidas;
          }
      ).catch();
  }

}
