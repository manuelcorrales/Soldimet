import { Routes } from '@angular/router';

import { ClientesComponent } from './clientes.component';
import { ClienteBorrarPopupComponent } from './modal-borrar-cliente/cliente-borrar-dialog.component';
import { ClienteModalPopupComponent } from './modal-nuevo-cliente/modal-nuevo-cliente.component';
import { UserRouteAccessService } from 'app/core';

export const CLIENTES_ROUTE: Routes = [
    {
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
        path: 'clientes/:id/editar',
        component: ClienteModalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Editar Cliente'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'clientes/:id/eliminar',
        component: ClienteBorrarPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Eliminar cliente'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
