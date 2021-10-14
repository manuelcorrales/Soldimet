import { Component, OnInit } from '@angular/core';
import { Presupuesto } from 'app/shared/model/presupuesto.model';
import { ActivatedRoute } from '@angular/router';
import { DetallePresupuesto } from '../../shared/model/detalle-presupuesto.model';

@Component({
  selector: 'jhi-presupuesto-detail',
  templateUrl: './presupuesto-detail.component.html',
  styleUrls: ['./presupuesto-detail.component.scss'],
})
export class PresupuestoDetailComponent implements OnInit {
  presupuesto: Presupuesto;
  esModelo;
  totalOperaciones = 0;
  totalRepuestos = 0;

  constructor(protected activatedRoute: ActivatedRoute) {}

  ngOnInit() {
    this.activatedRoute.data.subscribe(({ presupuesto }) => {
      this.presupuesto = presupuesto;
      this.esModelo = presupuesto.modelo ? 'Si' : 'No';
      this.calcularTotalOperacionesYRepuestos();
    });
  }

  calcularTotalOperacionesYRepuestos() {
    this.presupuesto.detallePresupuestos.forEach((detalle: DetallePresupuesto) => {
      detalle.cobranzaOperacions.forEach(cobranza => (this.totalOperaciones += cobranza.cobranzaOperacion));
      detalle.cobranzaRepuestos.forEach(cobranza => (this.totalRepuestos += cobranza.valor));
    });
  }
}
