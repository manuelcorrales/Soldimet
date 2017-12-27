import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { CategoriaPagoComponent } from './categoria-pago.component';
import { CategoriaPagoDetailComponent } from './categoria-pago-detail.component';
import { CategoriaPagoPopupComponent } from './categoria-pago-dialog.component';
import { CategoriaPagoDeletePopupComponent } from './categoria-pago-delete-dialog.component';

export const categoriaPagoRoute: Routes = [
    {
        path: 'categoria-pago',
        component: CategoriaPagoComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'categoria-pago/:id',
        component: CategoriaPagoDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const categoriaPagoPopupRoute: Routes = [
    {
        path: 'categoria-pago-new',
        component: CategoriaPagoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categoria-pago/:id/edit',
        component: CategoriaPagoPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'categoria-pago/:id/delete',
        component: CategoriaPagoDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'CategoriaPagos'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
