import { Component, Input, Output, OnInit, ViewChildren, QueryList, EventEmitter } from '@angular/core';
import { PresupuestosService } from 'app/presupuestos/presupuestos.service';
import { DTODatosMotorComponent } from 'app/dto/dto-presupuesto-cabecera/DTODatosMotor';
import { OperacionPrecioComponent } from 'app/presupuestos/nuevo-presupuesto/clientes-nuevopresupuesto/operaciones-nuevopresupuesto/operaciones-nuevopresupuesto/operacion_precio/operacion-precio.component';
import { CostoOperacion } from 'app/shared/model/costo-operacion.model';
import { DetallePresupuesto } from 'app/shared/model/detalle-presupuesto.model';
import { CobranzaOperacion } from 'app/shared/model/cobranza-operacion.model';

@Component({
  selector: 'jhi-operaciones-nuevopresupuesto',
  templateUrl: './operaciones-nuevopresupuesto.component.html',
  styles: [],
})
export class OperacionesNuevopresupuestoComponent implements OnInit {
  @Input() detalle: DetallePresupuesto;
  operacionesViejoPresupuesto: CobranzaOperacion[] = [];
  operaciones: CostoOperacion[] = [];
  total = 0;
  @ViewChildren('operaciones') children: QueryList<OperacionPrecioComponent>;
  @Output() eventoTotalOperaciones = new EventEmitter<number>();

  constructor(private presupuestosService: PresupuestosService) {}

  ngOnInit() {
    // Guardo las operaciones del viejo presupuesto (no las uso ahora, pero las guardo)
    this.operacionesViejoPresupuesto = this.detalle.cobranzaOperacions || [];
    this.detalle.cobranzaOperacions = [];
    this.update();
  }

  completarDetalle() {
    const cobranzaOperaciones: CobranzaOperacion[] = [];
    this.children.forEach(componente => {
      if (componente.seleccionado) {
        cobranzaOperaciones.push(componente.getOperacionAcobrar());
      }
    });
    this.detalle.cobranzaOperacions = cobranzaOperaciones;
  }

  isOperacionElegida(costoOperacion: CostoOperacion) {
    let isElegida = false;
    if (this.operacionesViejoPresupuesto) {
      this.operacionesViejoPresupuesto.forEach((cobranza: CobranzaOperacion) => {
        if (cobranza.operacion.id === costoOperacion.operacion.id) {
          isElegida = true;
        }
      });
    }
    return isElegida;
  }

  update() {
    const dto: DTODatosMotorComponent = new DTODatosMotorComponent();
    dto.idAplicacion = this.detalle.aplicacion.id;
    dto.idCilindrada = this.detalle.cilindrada.id;
    dto.idMotor = this.detalle.motor.id;
    dto.idTiposPartesMotores = this.detalle.tipoParteMotor.id;
    this.presupuestosService.findOperacionesPresupuesto(dto).subscribe(result => {
      this.operaciones.push(...result);
      this.operaciones.sort(this._sortCostoRepuesto);
    });
  }

  @Input()
  cambioTotalOperaciones() {
    this.total = 0;
    this.children.forEach(componente => {
      this.total = this.total + componente.getPrecio();
    });
    this.eventoTotalOperaciones.emit();
  }

  _sortCostoRepuesto(a: CostoOperacion, b: CostoOperacion) {
    if (a.operacion.nombreOperacion > b.operacion.nombreOperacion) {
      return 1;
    }
    if (a.operacion.nombreOperacion < b.operacion.nombreOperacion) {
      return -1;
    }
    return 0;
  }
}
