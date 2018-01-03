import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {OperacionesComponent} from "./operaciones.component";

export const OPERACIONES_ROUTE: Route = {
    path: 'operaciones',
    component: OperacionesComponent,
    data: {
        authorities: ['ROLE_USUARIO'],
        pageTitle: 'Operaciones'
    },
    canActivate: [UserRouteAccessService]
};
