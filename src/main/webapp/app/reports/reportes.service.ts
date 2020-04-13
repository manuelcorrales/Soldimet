import { Injectable } from '@angular/core';
// import { SERVER_API_URL } from 'app/app.constants';
import { HttpClient } from '@angular/common/http';
import { SERVER_API_URL } from 'app/app.constants';
import { Observable } from 'rxjs';
import { DtoNameSeries } from 'app/dto/dto-reportes/dto-serie';
import { DtoCountMetric } from 'app/dto/dto-reportes/dto-count-metric';

@Injectable()
export class ReportesService {
  private resourceUrlReportes = SERVER_API_URL + 'api/reportes';
  private urlCajaDiariaMensual = '/cajaDiariaMensual';
  private urlCajaDiaria = '/cajaDiaria';
  private urlMetricasContables = '/metricasContables';

  constructor(private http: HttpClient) {}

  getCajaDiariaMensual(): Observable<DtoNameSeries[]> {
    const urlLlamada = `${this.resourceUrlReportes}${this.urlCajaDiariaMensual}/`;
    return this.http.get<DtoNameSeries[]>(urlLlamada);
  }

  getCajaDiaria(): Observable<DtoNameSeries[]> {
    const urlLlamada = `${this.resourceUrlReportes}${this.urlCajaDiaria}/`;
    return this.http.get<DtoNameSeries[]>(urlLlamada);
  }

  getMetricasContables(): Observable<DtoCountMetric[]> {
    const urlLlamada = `${this.resourceUrlReportes}${this.urlMetricasContables}/`;
    return this.http.get<DtoCountMetric[]>(urlLlamada);
  }
}