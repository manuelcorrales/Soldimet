import { Route } from '@angular/router';

import { JhiFlagsComponent } from './flags.component';

export const flagsRoute: Route = {
  path: 'flags',
  component: JhiFlagsComponent,
  data: {
    pageTitle: 'Feature Flags',
  },
};
