import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { EstadoMovimientoComponent } from './estado-movimiento.component';
import { EstadoMovimientoDetailComponent } from './estado-movimiento-detail.component';
import { EstadoMovimientoPopupComponent } from './estado-movimiento-dialog.component';
import { EstadoMovimientoDeletePopupComponent } from './estado-movimiento-delete-dialog.component';

export const estadoMovimientoRoute: Routes = [
    {
        path: 'estado-movimiento',
        component: EstadoMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'estado-movimiento/:id',
        component: EstadoMovimientoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const estadoMovimientoPopupRoute: Routes = [
    {
        path: 'estado-movimiento-new',
        component: EstadoMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-movimiento/:id/edit',
        component: EstadoMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'estado-movimiento/:id/delete',
        component: EstadoMovimientoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'EstadoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
