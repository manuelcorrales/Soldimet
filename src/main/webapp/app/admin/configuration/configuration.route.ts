import { Route } from '@angular/router';

import { JhiConfigurationComponent } from 'app/admin/configuration/configuration.component';

export const configurationRoute: Route = {
  path: 'configuration',
  component: JhiConfigurationComponent,
  data: {
    pageTitle: 'Configuration'
  }
};
