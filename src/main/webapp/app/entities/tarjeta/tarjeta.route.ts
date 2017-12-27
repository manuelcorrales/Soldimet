import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { TarjetaComponent } from './tarjeta.component';
import { TarjetaDetailComponent } from './tarjeta-detail.component';
import { TarjetaPopupComponent } from './tarjeta-dialog.component';
import { TarjetaDeletePopupComponent } from './tarjeta-delete-dialog.component';

export const tarjetaRoute: Routes = [
    {
        path: 'tarjeta',
        component: TarjetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarjetas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'tarjeta/:id',
        component: TarjetaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarjetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const tarjetaPopupRoute: Routes = [
    {
        path: 'tarjeta-new',
        component: TarjetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tarjeta/:id/edit',
        component: TarjetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'tarjeta/:id/delete',
        component: TarjetaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'Tarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
