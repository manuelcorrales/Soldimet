import { Route } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClientesComponent} from "./clientes.component";

export const CLIENTES_ROUTE: Route = {
    path: 'clientes',
    component: ClientesComponent,
    data: {
        authorities: ['ROLE_USUARIO'],
        pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService]
};
