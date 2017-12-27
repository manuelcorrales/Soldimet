import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { FormaDePagoComponent } from './forma-de-pago.component';
import { FormaDePagoDetailComponent } from './forma-de-pago-detail.component';
import { FormaDePagoPopupComponent } from './forma-de-pago-dialog.component';
import { FormaDePagoDeletePopupComponent } from './forma-de-pago-delete-dialog.component';

export const formaDePagoRoute: Routes = [
    {
        path: 'forma-de-pago',
        component: FormaDePagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'forma-de-pago/:id',
        component: FormaDePagoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const formaDePagoPopupRoute: Routes = [
    {
        path: 'forma-de-pago-new',
        component: FormaDePagoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'forma-de-pago/:id/edit',
        component: FormaDePagoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'forma-de-pago/:id/delete',
        component: FormaDePagoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'FormaDePagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
