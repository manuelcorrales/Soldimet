import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {CajaComponent} from "./caja.component";

export const CAJA_ROUTE: Route = {
    path: 'cajas',
    component: CajaComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Caja'
    },
    canActivate: [UserRouteAccessService]
};
