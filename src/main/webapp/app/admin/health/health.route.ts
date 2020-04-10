import { Route } from '@angular/router';

import { JhiHealthCheckComponent } from 'app/admin/health/health.component';

export const healthRoute: Route = {
  path: 'health',
  component: JhiHealthCheckComponent,
  data: {
    pageTitle: 'Health Checks'
  }
};
