import { Route } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CajaComponent } from './caja.component';
import { UserRouteAccessService } from 'app/core';

export const CAJA_ROUTE: Route = {
    path: 'cajas',
    component: CajaComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Caja'
    },
    canActivate: [UserRouteAccessService]
};
