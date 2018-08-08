import { Route } from '@angular/router';

import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { PedidosComponent } from './pedidos.component';
import { UserRouteAccessService } from 'app/core';

export const PEDIDOS_ROUTE: Route = {
    path: 'pedidos',
    component: PedidosComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Pedidos'
    },
    canActivate: [UserRouteAccessService]
};
