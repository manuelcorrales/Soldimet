import { Routes } from '@angular/router';
import { ReportesComponent } from 'app/reports/reportes.component';

export const REPORTES_ROUTES: Routes = [
  {
    path: 'reportes',
    component: ReportesComponent,
    data: {
      authorities: ['ROLE_JEFE', 'ROLE_ADMIN'],
      pageTitle: 'Pedidos',
    },
  },
];
