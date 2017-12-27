import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot, Routes, CanActivate } from '@angular/router';

import { UserRouteAccessService } from '../../shared';
import { JhiPaginationUtil } from 'ng-jhipster';

import { PagoTarjetaComponent } from './pago-tarjeta.component';
import { PagoTarjetaDetailComponent } from './pago-tarjeta-detail.component';
import { PagoTarjetaPopupComponent } from './pago-tarjeta-dialog.component';
import { PagoTarjetaDeletePopupComponent } from './pago-tarjeta-delete-dialog.component';

export const pagoTarjetaRoute: Routes = [
    {
        path: 'pago-tarjeta',
        component: PagoTarjetaComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }, {
        path: 'pago-tarjeta/:id',
        component: PagoTarjetaDetailComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService]
    }
];

export const pagoTarjetaPopupRoute: Routes = [
    {
        path: 'pago-tarjeta-new',
        component: PagoTarjetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago-tarjeta/:id/edit',
        component: PagoTarjetaPopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    },
    {
        path: 'pago-tarjeta/:id/delete',
        component: PagoTarjetaDeletePopupComponent,
        data: {
            authorities: ['ROLE_USER'],
            pageTitle: 'PagoTarjetas'
        },
        canActivate: [UserRouteAccessService],
        outlet: 'popup'
    }
];
