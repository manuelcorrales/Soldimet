import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {RepuestosComponent} from "./repuestos.component";

export const REPUESTOS_ROUTE: Route = {
    path: 'repuestos',
    component: RepuestosComponent,
    data: {
        authorities: ['ROLE_USUARIO'],
        pageTitle: 'Repuestos'
    },
    canActivate: [UserRouteAccessService]
};
