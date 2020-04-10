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

@NgModule({
  declarations: [
    ReportesComponent,
    CardMetricComponent,
    CircleComponent,
    LinearComponent,
    CircleMetricComponent,
    CardBarsComponent,
    CardPunteroComponent
  ],
  imports: [NgxChartsModule, SoldimetSharedModule, CommonModule, RouterModule.forRoot(REPORTES_ROUTES)],
  entryComponents: [ReportesComponent, CardMetricComponent, CircleComponent, LinearComponent, CircleMetricComponent, CardBarsComponent],
  providers: [ReportesService]
})
export class ReportsModule {}
