import { Route } from '@angular/router';

import { JhiMetricsMonitoringComponent } from 'app/admin/metrics/metrics.component';

export const metricsRoute: Route = {
  path: 'metrics',
  component: JhiMetricsMonitoringComponent,
  data: {
    pageTitle: 'Application Metrics'
  }
};
