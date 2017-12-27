import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoPedidoRepuestoComponent } from './estado-pedido-repuesto.component';
import { EstadoPedidoRepuestoDetailComponent } from './estado-pedido-repuesto-detail.component';
import { EstadoPedidoRepuestoPopupComponent } from './estado-pedido-repuesto-dialog.component';
import { EstadoPedidoRepuestoDeletePopupComponent } from './estado-pedido-repuesto-delete-dialog.component';

export const estadoPedidoRepuestoRoute: Routes = [
    {
        path: 'estado-pedido-repuesto',
        component: EstadoPedidoRepuestoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-pedido-repuesto/:id',
        component: EstadoPedidoRepuestoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoPedidoRepuestoPopupRoute: Routes = [
    {
        path: 'estado-pedido-repuesto-new',
        component: EstadoPedidoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-pedido-repuesto/:id/edit',
        component: EstadoPedidoRepuestoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-pedido-repuesto/:id/delete',
        component: EstadoPedidoRepuestoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoPedidoRepuestos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
