import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PagoEfectivoComponent } from './pago-efectivo.component';
import { PagoEfectivoDetailComponent } from './pago-efectivo-detail.component';
import { PagoEfectivoPopupComponent } from './pago-efectivo-dialog.component';
import { PagoEfectivoDeletePopupComponent } from './pago-efectivo-delete-dialog.component';

export const pagoEfectivoRoute: Routes = [
    {
        path: 'pago-efectivo',
        component: PagoEfectivoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pago-efectivo/:id',
        component: PagoEfectivoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagoEfectivoPopupRoute: Routes = [
    {
        path: 'pago-efectivo-new',
        component: PagoEfectivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago-efectivo/:id/edit',
        component: PagoEfectivoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago-efectivo/:id/delete',
        component: PagoEfectivoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoEfectivos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
