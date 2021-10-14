import { Component, OnInit } from '@angular/core';
import { ReportesService } from './reportes.service';
import { DtoNameSeries } from 'app/dto/dto-reportes/dto-serie';
import { JhiAlertService } from 'ng-jhipster';
import { DtoCountMetric } from 'app/dto/dto-reportes/dto-count-metric';
import { CardMetric } from './card-metric/card-metric';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'jhi-reportes',
  templateUrl: './reportes.component.html',
  styles: [],
})
export class ReportesComponent implements OnInit {
  lineMetric: { metric: String; values: DtoNameSeries[] } = { metric: '', values: [] };
  barMetric: { metric: String; values: DtoNameSeries[] } = { metric: '', values: [] };
  countMetric: CardMetric[] = [];

  formGroup: FormGroup;
  limpiarFiltrado = false;
  fechaDesde = null;
  fechaHasta = null;

  constructor(private reportService: ReportesService, private alertService: JhiAlertService) {}

  ngOnInit() {
    this.generateCardMetrid();
    this.getCajaDiariaYMensual();
    this.getMetricasContables();
    this.formGroup = new FormGroup({
      FechaDesde: new FormControl('', [Validators.required]),
      FechaHasta: new FormControl('', [Validators.required]),
    });
  }

  private generateCardMetrid() {
    this.countMetric = [
      {
        categoria: 'PRESUPUESTOS ACEPTADOS',
        titulo: 'ACEPTADOS',
        icon: 'briefcase',
        link: '#',
        bgColor: 'bg-secondary',
        textColor: 'text-white',
        valor: 0,
      },
      {
        categoria: 'INGRESO MENSUAL',
        titulo: 'INGRESO MENSUAL',
        icon: 'cash-register',
        link: '#',
        bgColor: 'bg-success',
        textColor: 'text-white',
        valor: 0,
      },
      {
        categoria: 'GASTO MENSUAL',
        titulo: 'GASTO MENSUAL',
        icon: 'money-bill-wave',
        link: '#',
        bgColor: 'bg-warning',
        textColor: 'text-white',
        valor: 0,
      },
      {
        categoria: 'GASTO REPUESTOS',
        titulo: 'REPUESTOS',
        icon: 'door-open',
        link: '#',
        bgColor: 'bg-info',
        textColor: 'text-white',
        valor: 0,
      },
      {
        categoria: 'PAGO PROVEEDORES',
        titulo: 'PROVEEDOR',
        icon: 'shopping-cart',
        link: '#',
        bgColor: 'bg-primary',
        textColor: 'text-white',
        valor: 0,
      },
      {
        categoria: 'GASTO FERRETERIA',
        titulo: 'FERRETERÍA',
        icon: 'wrench',
        link: '#',
        bgColor: 'bg-danger',
        textColor: 'text-white',
        valor: 0,
      },
    ];
    this.lineMetric = {
      metric: 'Caja diaria por sucursal',
      values: [],
    };
    this.barMetric = {
      metric: 'Caja hoy por sucursal',
      values: [],
    };
  }

  private getCajaDiariaYMensual() {
    this.reportService.getCajaDiariaMensual(this.fechaDesde, this.fechaHasta).subscribe(
      (diarios: DtoNameSeries[]) => (this.lineMetric.values = diarios),
      (error: Error) => this.alertService.error(error.message)
    );
    this.reportService.getCajaDiaria().subscribe(
      (diarios: DtoNameSeries[]) => (this.barMetric.values = diarios),
      (error: Error) => this.alertService.error(error.message)
    );
  }

  private getMetricasContables() {
    this.reportService.getMetricasContables(this.fechaDesde, this.fechaHasta).subscribe(
      (metricas: DtoCountMetric[]) => {
        metricas.forEach(metrica => {
          this.countMetric.forEach(contadorMetrica => {
            if (contadorMetrica.categoria === metrica.categoria) {
              contadorMetrica.valor = metrica.valor;
            }
          });
          // if (metrica.categoria === 'PRESUPUESTOS ACEPTADOS') {
          //   this.countMetric[0].valor = metrica.valor;
          // } else if (metrica.categoria === 'GASTO REPUESTOS') {
          //   this.countMetric[1].valor = metrica.valor;
          // } else if (metrica.categoria === 'INGRESO MENSUAL') {
          //   this.countMetric[2].valor = metrica.valor;
          // } else if (metrica.categoria === 'GASTO MENSUAL') {
          //   this.countMetric[3].valor = metrica.valor * -1;
          // } else if (metrica.categoria === 'PAGO PROVEEDORES') {
          //   this.countMetric[4].valor = metrica.valor * -1;
          // } else if (metrica.categoria === 'GASTO FERRETERIA') {
          //   this.countMetric[5].valor = metrica.valor * -1;
          // }
        });
      },
      (error: Error) => this.alertService.error(error.message)
    );
  }

  limpiarFiltros() {
    this.limpiarFiltrado = false;
    this.fechaDesde = null;
    this.formGroup.get('FechaDesde').setValue('');
    this.fechaHasta = null;
    this.formGroup.get('FechaHasta').setValue('');
    this.getCajaDiariaYMensual();
    this.getMetricasContables();
  }

  filtrar() {
    this.limpiarFiltrado = true;
    this.fechaDesde = this.formatDate(this.formGroup.value['FechaDesde']);
    this.fechaHasta = this.formatDate(this.formGroup.value['FechaHasta']);
    this.getCajaDiariaYMensual();
    this.getMetricasContables();
  }

  formatDate(date: any) {
    return date.format(date._f);
  }
}
