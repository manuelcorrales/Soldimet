import { Routes } from '@angular/router';

import { ErrorComponent } from 'app/layouts/error/error.component';

export const errorRoute: Routes = [
  {
    path: 'error',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Soldimet'
    }
  },
  {
    path: 'accessdenied',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Soldimet',
      error403: true
    }
  },
  {
    path: '404',
    component: ErrorComponent,
    data: {
      authorities: [],
      pageTitle: 'Soldimet',
      error404: true
    }
  },
  {
    path: '**',
    redirectTo: '/404'
  }
];
