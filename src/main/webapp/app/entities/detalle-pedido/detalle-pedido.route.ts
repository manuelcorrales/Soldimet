import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DetallePedidoComponent } from './detalle-pedido.component';
import { DetallePedidoDetailComponent } from './detalle-pedido-detail.component';
import { DetallePedidoPopupComponent } from './detalle-pedido-dialog.component';
import { DetallePedidoDeletePopupComponent } from './detalle-pedido-delete-dialog.component';

export const detallePedidoRoute: Routes = [
    {
        path: 'detalle-pedido',
        component: DetallePedidoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'detalle-pedido/:id',
        component: DetallePedidoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePedidos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detallePedidoPopupRoute: Routes = [
    {
        path: 'detalle-pedido-new',
        component: DetallePedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detalle-pedido/:id/edit',
        component: DetallePedidoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detalle-pedido/:id/delete',
        component: DetallePedidoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetallePedidos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
