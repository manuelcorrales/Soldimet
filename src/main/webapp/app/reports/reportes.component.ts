import { Component, OnInit } from '@angular/core';
import { ReportesService } from './reportes.service';
import { DtoNameSeries } from 'app/dto/dto-reportes/dto-serie';
import { JhiAlertService } from 'ng-jhipster';
import { DtoCountMetric } from 'app/dto/dto-reportes/dto-count-metric';

@Component({
  selector: 'jhi-reportes',
  templateUrl: './reportes.component.html',
  styles: []
})
export class ReportesComponent implements OnInit {
  lineMetric: { metric: String; values: DtoNameSeries[] } = { metric: '', values: [] };
  barMetric: { metric: String; values: DtoNameSeries[] } = { metric: '', values: [] };
  countMetric: {
    icon: string;
    link: string;
    bgColor: string;
    textColor: string;
    valor: number;
    categoria: string;
  }[] = [];

  constructor(private reportService: ReportesService, private alertService: JhiAlertService) {}

  ngOnInit() {
    this.generateCardMetrid();
    this.getCajaDiariaYMensual();
    this.getMetricasContables();
  }

  private generateCardMetrid() {
    this.countMetric = [
      {
        categoria: 'PRESUPUESTOS ACEPTADOS',
        icon: 'briefcase',
        link: '#',
        bgColor: 'bg-secondary',
        textColor: 'text-white',
        valor: 0
      },
      {
        categoria: 'POR ENTREGAR',
        icon: 'door-open',
        link: '#',
        bgColor: 'bg-success',
        textColor: 'text-white',
        valor: 0
      },
      {
        categoria: 'INGRESO MENSUAL',
        icon: 'cash-register',
        link: '#',
        bgColor: 'bg-info',
        textColor: 'text-white',
        valor: 0
      },
      {
        categoria: 'GASTO MENSUAL',
        icon: 'money-bill-wave',
        link: '#',
        bgColor: 'bg-secondary',
        textColor: 'text-white',
        valor: 0
      },
      {
        categoria: 'PAGO PROVEEDORES',
        icon: 'shopping-cart',
        link: '#',
        bgColor: 'bg-primary',
        textColor: 'text-white',
        valor: 0
      },
      {
        categoria: 'GASTO FERRETERIA',
        icon: 'wrench',
        link: '#',
        bgColor: 'bg-danger',
        textColor: 'text-white',
        valor: 0
      }
    ];
    this.lineMetric = {
      metric: 'Caja diaria por sucursal',
      values: []
    };
    this.barMetric = {
      metric: 'Caja hoy por sucursal',
      values: []
    };
  }

  private getCajaDiariaYMensual() {
    this.reportService
      .getCajaDiariaMensual()
      .subscribe(
        (diarios: DtoNameSeries[]) => (this.lineMetric.values = diarios),
        (error: Error) => this.alertService.error(error.message)
      );
    this.reportService
      .getCajaDiaria()
      .subscribe((diarios: DtoNameSeries[]) => (this.barMetric.values = diarios), (error: Error) => this.alertService.error(error.message));
  }

  private getMetricasContables() {
    this.reportService.getMetricasContables().subscribe(
      (metricas: DtoCountMetric[]) => {
        metricas.forEach(metrica => {
          if (metrica.categoria === 'PRESUPUESTOS ACEPTADOS') {
            this.countMetric[0].valor = metrica.valor;
          } else if (metrica.categoria === 'POR ENTREGAR') {
            this.countMetric[1].valor = metrica.valor;
          } else if (metrica.categoria === 'INGRESO MENSUAL') {
            this.countMetric[2].valor = metrica.valor;
          } else if (metrica.categoria === 'GASTO MENSUAL') {
            this.countMetric[3].valor = metrica.valor * -1;
          } else if (metrica.categoria === 'PAGO PROVEEDORES') {
            this.countMetric[4].valor = metrica.valor * -1;
          } else if (metrica.categoria === 'GASTO FERRETERIA') {
            this.countMetric[5].valor = metrica.valor * -1;
          }
        });
      },
      (error: Error) => this.alertService.error(error.message)
    );
  }
}
