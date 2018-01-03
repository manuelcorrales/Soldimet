import { Route } from '@angular/router';

import { PresupuestosComponent } from "./presupuestos.component";
import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

export const PRESUPUESTOS_ROUTE: Route = {
    path: 'presupuestos',
    component: PresupuestosComponent,
    data: {
        authorities: ['ROLE_USUARIO'],
        pageTitle: 'Presupuestos'
    },
    canActivate: [UserRouteAccessService]
};
