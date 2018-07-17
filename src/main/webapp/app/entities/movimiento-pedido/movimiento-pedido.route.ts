import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { MovimientoPedidoComponent } from './movimiento-pedido.component';
import { MovimientoPedidoDetailComponent } from './movimiento-pedido-detail.component';
import { MovimientoPedidoPopupComponent } from './movimiento-pedido-dialog.component';
import { MovimientoPedidoDeletePopupComponent } from './movimiento-pedido-delete-dialog.component';

export const movimientoPedidoRoute: Routes = [
    {
        path: 'movimiento-pedido',
        component: MovimientoPedidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'movimiento-pedido/:id',
        component: MovimientoPedidoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const movimientoPedidoPopupRoute: Routes = [
    {
        path: 'movimiento-pedido-new',
        component: MovimientoPedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento-pedido/:id/edit',
        component: MovimientoPedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'movimiento-pedido/:id/delete',
        component: MovimientoPedidoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'MovimientoPedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
