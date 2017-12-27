import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { DetalleMovimientoComponent } from './detalle-movimiento.component';
import { DetalleMovimientoDetailComponent } from './detalle-movimiento-detail.component';
import { DetalleMovimientoPopupComponent } from './detalle-movimiento-dialog.component';
import { DetalleMovimientoDeletePopupComponent } from './detalle-movimiento-delete-dialog.component';

export const detalleMovimientoRoute: Routes = [
    {
        path: 'detalle-movimiento',
        component: DetalleMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'detalle-movimiento/:id',
        component: DetalleMovimientoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const detalleMovimientoPopupRoute: Routes = [
    {
        path: 'detalle-movimiento-new',
        component: DetalleMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detalle-movimiento/:id/edit',
        component: DetalleMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'detalle-movimiento/:id/delete',
        component: DetalleMovimientoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'DetalleMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
