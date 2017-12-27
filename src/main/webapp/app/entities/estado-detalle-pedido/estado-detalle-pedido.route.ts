import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoDetallePedidoComponent } from './estado-detalle-pedido.component';
import { EstadoDetallePedidoDetailComponent } from './estado-detalle-pedido-detail.component';
import { EstadoDetallePedidoPopupComponent } from './estado-detalle-pedido-dialog.component';
import { EstadoDetallePedidoDeletePopupComponent } from './estado-detalle-pedido-delete-dialog.component';

export const estadoDetallePedidoRoute: Routes = [
    {
        path: 'estado-detalle-pedido',
        component: EstadoDetallePedidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-detalle-pedido/:id',
        component: EstadoDetallePedidoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoDetallePedidoPopupRoute: Routes = [
    {
        path: 'estado-detalle-pedido-new',
        component: EstadoDetallePedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-detalle-pedido/:id/edit',
        component: EstadoDetallePedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-detalle-pedido/:id/delete',
        component: EstadoDetallePedidoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoDetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
