import {Route, Routes} from '@angular/router';

import { UserRouteAccessService } from '../shared';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import {ClientesComponent} from "./clientes.component";
import {ModalNuevoClienteComponent} from "./modal-nuevo-cliente/modal-nuevo-cliente.component";




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
        component: ModalNuevoClienteComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Nuevo Cliente'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    /*{
        path: 'clientes/:id/edit',
        component: ClientePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clientes/:id/delete',
        component: ClienteDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Clientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }*/
];
