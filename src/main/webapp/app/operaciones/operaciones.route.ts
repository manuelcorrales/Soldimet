import { Route } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { OperacionesComponent } from './operaciones.component';
import { UserRouteAccessService } from 'app/core';

export const OPERACIONES_ROUTE: Route = {
    path: 'operaciones',
    component: OperacionesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Operaciones'
    },
    canActivate: [UserRouteAccessService]
};
