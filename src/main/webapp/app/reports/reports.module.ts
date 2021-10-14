import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoldimetSharedModule } from 'app/shared/shared.module';
import { ReportesComponent } from 'app/reports/reportes.component';
import { ReportesService } from 'app/reports/reportes.service';
import { REPORTES_ROUTES } from 'app/reports/reportes.route';
import { CardMetricComponent } from 'app/reports/card-metric/card-metric.component';
import { CircleComponent } from 'app/reports/circle/circle.component';
import { LinearComponent } from 'app/reports/linear/linear.component';
import { CircleMetricComponent } from 'app/reports/circle-metric/circle-metric.component';
import { RouterModule } from '@angular/router';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CardBarsComponent } from './card-bars/card-bars.component';
import { CardPunteroComponent } from './card-puntero/card-puntero.component';
import { DescargaReportesComponent } from './descarga-reportes/descarga-reportes.component';
import { NgBootstrapFormValidationModule, ErrorMessage, CUSTOM_ERROR_MESSAGES } from 'ng-bootstrap-form-validation';
import { ReactiveFormsModule } from '@angular/forms';

export const CUSTOM_ERRORS: ErrorMessage[] = [
  {
    error: 'required',
    format: (label: string, error: any) => 'Requerido.',
  },
];

@NgModule({
  declarations: [
    ReportesComponent,
    CardMetricComponent,
    CircleComponent,
    LinearComponent,
    CircleMetricComponent,
    CardBarsComponent,
    CardPunteroComponent,
    DescargaReportesComponent,
  ],
  imports: [
    NgxChartsModule,
    SoldimetSharedModule,
    CommonModule,
    RouterModule.forRoot(REPORTES_ROUTES),
    ReactiveFormsModule,
    NgBootstrapFormValidationModule,
  ],
  entryComponents: [ReportesComponent, CardMetricComponent, CircleComponent, LinearComponent, CircleMetricComponent, CardBarsComponent],
  providers: [ReportesService, { provide: CUSTOM_ERROR_MESSAGES, useValue: CUSTOM_ERRORS, multi: true }],
})
export class ReportsModule {}
