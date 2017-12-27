import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TipoMovimientoComponent } from './tipo-movimiento.component';
import { TipoMovimientoDetailComponent } from './tipo-movimiento-detail.component';
import { TipoMovimientoPopupComponent } from './tipo-movimiento-dialog.component';
import { TipoMovimientoDeletePopupComponent } from './tipo-movimiento-delete-dialog.component';

export const tipoMovimientoRoute: Routes = [
    {
        path: 'tipo-movimiento',
        component: TipoMovimientoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tipo-movimiento/:id',
        component: TipoMovimientoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tipoMovimientoPopupRoute: Routes = [
    {
        path: 'tipo-movimiento-new',
        component: TipoMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-movimiento/:id/edit',
        component: TipoMovimientoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tipo-movimiento/:id/delete',
        component: TipoMovimientoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'TipoMovimientos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
