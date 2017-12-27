import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { HistorialPrecioComponent } from './historial-precio.component';
import { HistorialPrecioDetailComponent } from './historial-precio-detail.component';
import { HistorialPrecioPopupComponent } from './historial-precio-dialog.component';
import { HistorialPrecioDeletePopupComponent } from './historial-precio-delete-dialog.component';

export const historialPrecioRoute: Routes = [
    {
        path: 'historial-precio',
        component: HistorialPrecioComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'historial-precio/:id',
        component: HistorialPrecioDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const historialPrecioPopupRoute: Routes = [
    {
        path: 'historial-precio-new',
        component: HistorialPrecioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'historial-precio/:id/edit',
        component: HistorialPrecioPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'historial-precio/:id/delete',
        component: HistorialPrecioDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'HistorialPrecios'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
