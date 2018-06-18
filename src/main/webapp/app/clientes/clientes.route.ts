import { Route, Routes } from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ClientesComponent } from './clientes.component';
import { ClienteModalPopupComponent } from './modal-nuevo-cliente/modal-nuevo-cliente.component'

export const CLIENTES_ROUTE: Routes = [{
    path: 'clientes',
    component: ClientesComponent,
    data: {
        authorities: ['ROLE_USER'],
        pageTitle: 'Clientes'
    },
    canActivate: [UserRouteAccessService]
}
];
export const CLIENTES_POPUP_ROUTE: Routes = [
    {
        path: 'nuevo-cliente',
        component: ClienteModalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nuevo Cliente'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'cliente/:id/edit',
        component: ClienteModalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editar Cliente'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },/*
    {
        path: 'cliente/:id/delete',
        component: ClienteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }*/
];
