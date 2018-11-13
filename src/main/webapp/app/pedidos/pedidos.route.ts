import { Routes } from '@angular/router';
import { PedidosComponent } from 'app/pedidos/pedidos.component';
import { UserRouteAccessService } from 'app/core';
import { PedidoPendienteModalPopupComponent } from 'app/pedidos/pedidos-pendientes/pedido-pendiente/pedido-pendiente.component';

export const PEDIDOS_SUBROUTES: Routes = [
    {
        path: 'pedidos',
        component: PedidosComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos'
        }
    }
];
export const PEDIDOS_NEW_POPUP_ROUTE: Routes = [
    {
        path: 'pedidos/:id',
        component: PedidoPendienteModalPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Pedidos Pendientes'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
    // {
    //     path: 'clientes/:id/editar',
    //     component: ClienteModalPopupComponent,
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'Editar Cliente'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // },
    // {
    //     path: 'clientes/:id/eliminar',
    //     component: ClienteBorrarPopupComponent,
    //     data: {
    //         authorities: ['ROLE_USER'],
    //         pageTitle: 'Eliminar cliente'
    //     },
    //     canActivate: [UserRouteAccessService],
    //     outlet: 'popup'
    // },
];
